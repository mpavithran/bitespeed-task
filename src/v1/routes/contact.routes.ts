import express from "express";
import validator from '../utils/validator.utils';
import contactSchema from '../validation/contact.validation';

import {
  identify,
} from "../controller/contact.controller";

const contactRouter = express.Router();

contactRouter.post("/identify",validator(contactSchema.identify), identify);

export default contactRouter;