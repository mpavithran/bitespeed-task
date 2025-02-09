import { Request, Response } from "express";
import { Contacts } from '../model/contact.model';

export const identify =  async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const contact = await Contacts.create({
      phoneNumber: '1234567890',
      email: 'customer@example.com',
      linkPrecedence: 'primary',
    });
    console.log('Contact created:', contact);
	return res.status(201).json({
	statusCode: 201,
    message: "success",
	data:contact
	})
  } catch (error:any) {
    console.error('Error creating contact:', error);
	res.status(400).json({ error: error.message });
  }
};
