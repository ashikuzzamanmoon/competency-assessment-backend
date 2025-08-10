import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import globalRouter from "./app/routes";
import httpStatus from "http-status";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", globalRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Competency Assessment Platform server is running!");
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  const message = err.message || "Something went wrong!";
  return res.status(statusCode).json({
    success: false,
    message,
    error: err,
  });
});

export default app;
