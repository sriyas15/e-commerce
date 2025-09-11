import express, { urlencoded } from "express";
import cors from 'cors';
import mongooseDB from "./config/db.js";
import productRoutes from './routes/productRoutes.js';
import asyncHandler from "./middleware/asyncHandler.js";
import {notFound,errorHandle} from "./middleware/errorHandle.js";
import userRoutes from './routes/userRoutes.js';
import cookieParser from "cookie-parser";

const app = express();
app.use(cors({
  origin: "http://localhost:5173",  // your frontend URL
  credentials: true,                // allow cookies
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser()); 

mongooseDB();

app.get("/", asyncHandler((req, res) => {
  res.send("Home Page...");
}));

app.use("/api/products",productRoutes);
app.use("/api/users",userRoutes);
app.use(notFound);
app.use(errorHandle);


app.listen(5000);
