import express  from 'express';
import dotenv from 'dotenv';
import database from './DB_config/database';
import AllRoutes from './Routes';
import cors from 'cors';
import {errorMiddleware} from './middlwares/globalError';
import i18nMiddleware from './middlwares/i18n'
const app : express.Application = express();
app.use(express.json());

app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = ['http://localhost:4200','http://localhost:3000'];
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, origin);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.options('*', cors());

database();
dotenv.config();

app.use("/uploads",express.static("uploads"));
app.use(i18nMiddleware);
AllRoutes(app);
app.use(errorMiddleware);

app.listen(process.env.PORT ||3010, ()=>{
   console.log(`App listen on Port : ${process.env.PORT}`) 
});  


