import cors from "cors";
import express from "express";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello");
});

// global error handler
app.use(globalErrorHandler);

export default app;
