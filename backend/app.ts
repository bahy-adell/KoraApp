import express from "express";
import dotenv from "dotenv";
import database from "./DB_config/database";
import AllRoutes from "./Routes";
import cors from "cors";
import { errorMiddleware } from "./middlwares/globalError";
import i18nMiddleware from "./middlwares/i18n";
import ServerlessHttp from "serverless-http";

dotenv.config(); 

const app: express.Application = express();
app.use(express.json());


const allowedOrigins = [
  "http://localhost:4200",
  "http://localhost:3000",
  process.env.BASE_URL || "https://kora-app.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.options("*", cors());

database();

app.use("/uploads", express.static("uploads"));
app.use(i18nMiddleware);


AllRoutes(app);
app.use(errorMiddleware);

const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
  console.log(`App listening on Port: ${PORT}`);
});

module.exports = app;
module.exports.handler = ServerlessHttp(app);