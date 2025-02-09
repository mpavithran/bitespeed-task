import express from "express";
import {
  identify,
} from "../controller/contact.controller";

const contactRouter = express.Router();

contactRouter.post("/identify", identify);

export default contactRouter;