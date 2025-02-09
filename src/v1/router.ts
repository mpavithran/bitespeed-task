import express, { Request, Response, NextFunction } from "express";
import contactRouter from "./routes/contact.routes";
import {
  NotFoundError,
  ApiError,
  InternalError,
  ErrorType,
} from './utils/error.utils';

const router = express.Router();

router.use("/contact", contactRouter);

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    ApiError.handle(err, res);
    if (err.type === ErrorType.INTERNAL)
      console.log(
        `500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
      );
  } else {
   console.log(
      `500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
    );
    console.log(err);
    ApiError.handle(new InternalError(), res);
  }
})

export default router;