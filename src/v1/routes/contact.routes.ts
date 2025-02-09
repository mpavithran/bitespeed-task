import express from "express";
import {
  createNewContact,
} from "../controller/contact.controller";

const contactRouter = express.Router();

contactRouter.post("/identify", createNewContact);

export default contactRouter;