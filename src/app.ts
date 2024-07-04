import cors from "cors";
import express from "express";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import routes from "./app/routes/routes";

const app = express();

app.use(express.json());
app.use(cors());

// application routes
app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Working fine");
});

// global error handler
app.use(globalErrorHandler);

export default app;
