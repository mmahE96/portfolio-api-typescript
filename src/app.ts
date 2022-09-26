import { Request, Response } from "express";
import express from "express";
import routes from "./routes/index";
import cors from "cors";
import logger from "./util/logger";
import {prisma} from "@prisma/client"




require("dotenv").config();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);
app.use("/api", routes);
app.get("/", async (req: Request, res: Response) => {
  // const result=await sendMail();

  res.send("Welcome to Gmail API with NodeJS");
});

app.listen(process.env.PORT || 3000, () => {
  logger.info("Listening on port " + 3000);
});
