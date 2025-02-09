import { Request, Response } from "express";
import { Contacts } from '../model/contact.model';
import asyncHandler from '../utils/async.utils';

export const identify =  asyncHandler(async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
  
  const contactConditions: any = {};

  if (req.body.email) {
    contactConditions.email = req.body.email;
  }

  if (req.body.phoneNumber) {
    contactConditions.phoneNumber = req.body.phoneNumber.toString();
  }
  
  let response = {}
  
  const contacts=await Contacts.findAll({
   where: contactConditions,
    include: [
	{
        model: Contacts,
        as: 'primaryContact', 
        required: false, 
    },
	{
      model: Contacts,
      as: 'linkedContact',
	  required: false,
    }],
  })
  
  if (contacts.length === 0) {
   const contactDetails= await Contacts.create({
	  email: req.body.email,
      phoneNumber: req.body.phoneNumber.toString(),
      linkPrecedence: 'primary',
    });
	
	 response = {
    contact: {
      primaryContatctId: contactDetails.id,
      emails: [contactDetails?.email || ''],
      phoneNumbers: [contactDetails?.phoneNumber || ''],
      secondaryContactIds: [],
    },
  };
  
	return res.status(201).json({
	statusCode: 201,
    message: "success",
	data:response
	})
  }

  const primaryContact = contacts.find(contact => contact.linkPrecedence === 'primary');
  const secondaryContacts = contacts.filter(contact => contact.linkPrecedence === 'secondary');

  const primaryContactId = primaryContact ? primaryContact.id : null;

  response = {
    contact: {
      primaryContatctId: primaryContactId,
      emails: [primaryContact?.email || ''],
      phoneNumbers: [primaryContact?.phoneNumber || ''],
      secondaryContactIds: secondaryContacts.map(contact => contact.id),
    },
  };

	return res.status(201).json({
	statusCode: 201,
    message: "success",
	data:response
	})
  } catch (error:any) {
    console.error('Error creating contact:', error);
	res.status(400).json({ error: error.message });
  }
});
