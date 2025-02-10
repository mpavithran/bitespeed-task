import { Request, Response } from "express";
import {Op } from "sequelize";
import { Contacts } from '../model/contact.model';
import asyncHandler from '../utils/async.utils';

export const identify =  asyncHandler(async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
 if ([null,undefined,'',0].includes(req.body.email)&&[null,undefined,'',0].includes(req.body.phoneNumber)){
	throw "Email 0r PhoneNumber needed"
 }
  const contactConditions: any = [];

  if (![null,undefined,'',0].includes(req.body.email)) {
    contactConditions.push({email : req.body.email});
  }

  if (![null,undefined,'',0].includes(req.body.phoneNumber)) {
   contactConditions.push({phoneNumber : req.body.phoneNumber.toString()});
  }
  
  let response = {}
  
  const contacts=await Contacts.findAll({
   where: {
   [Op.or]:contactConditions
   },
   order:[['id','ASC']]
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
  
	return res.status(200).json({
	statusCode: 200,
    message: "success",
	data:response
	})
  }
  
   const newContact= await Contacts.create({
	  email: req.body.email,
      phoneNumber: req.body.phoneNumber.toString(),
	  linkedId: contacts[0]?.id||null,
      linkPrecedence: 'secondary',
    });

  const primaryContact = [...new Set(contacts.map(contact => contact.email))];
  const secondaryContacts = contacts.filter(contact => contact.linkPrecedence === 'secondary');

  const primaryContactId =contacts[0].id;
  let emails=contacts.map(contact => contact.email)
  let phoneNumbers=contacts.map(contact => contact.phoneNumber)
  if(![null,undefined,'',0].includes(newContact.email)){
	emails.push(newContact.email)
  }
  if(![null,undefined,'',0].includes(newContact.phoneNumber)){
	phoneNumbers.push(newContact.phoneNumber)
  }
  response = {
    contact: {
      primaryContatctId: primaryContactId,
      emails:  [...new Set(emails.filter(e=>![null,undefined,'',0].includes(e)))],
      phoneNumbers:  [...new Set(phoneNumbers.filter(e=>![null,undefined,'',0].includes(e)))],
      secondaryContactIds: [...secondaryContacts.map(contact => contact.id),newContact.id],
    },
  };

	return res.status(200).json({
		data:response
	})
  } catch (error:any) {
    console.error('Error creating contact:', error);
	if(!error.message){
		return res.status(400).json({ error: error });
	}
	return res.status(400).json({ error: error.message });
  }
});
