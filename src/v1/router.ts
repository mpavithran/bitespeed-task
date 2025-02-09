import express from "express";
import contactRouter from "./routes/contact.routes";

const router = express.Router();

router.use("/contact", contactRouter);

export default router;