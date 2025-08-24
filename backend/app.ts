import express from "express";
import dotenv from "dotenv";
import database from "./DB_config/database";
import AllRoutes from "./Routes";
import cors from "cors";
import { errorMiddleware } from "./middlwares/globalError";
import i18nMiddleware from "./middlwares/i18n";

dotenv.config();

const app: express.Application = express();
app.use(express.json());

// ✅ CORS setup
const allowedOrigins = [
  "http://localhost:4200",
  "http://localhost:3000",
  process.env.BASE_URL,
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

// ✅ DB Connection
database();

// ✅ Middlewares
app.use("/uploads", express.static("uploads"));
app.use(i18nMiddleware);

// ✅ Routes
AllRoutes(app);

// ✅ Error Middleware
app.use(errorMiddleware);

// ✅ Test route (for debugging on Vercel)
app.get("/h", (req, res) => {
  res.send("Hello from Express on Vercel!");
});

// 🔑 Export ONLY the app (no listen here)
export default app;
