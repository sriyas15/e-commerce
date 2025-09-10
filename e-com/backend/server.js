import express, { urlencoded } from "express";
import cors from 'cors';
import mongooseDB from "./config/db.js";
import productRoutes from './routes/productRoutes.js';
import asyncHandler from "./middleware/asyncHandler.js";
import {notFound,errorHandle} from "./errorHandle/errorHandle.js";
import userRoutes from './routes/userRoutes.js';


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

mongooseDB();


app.get("/", asyncHandler((req, res) => {
  res.send("Home Page...");
}));

app.use("/api/products",productRoutes);
app.use("/api/users",userRoutes);
app.use(notFound);
app.use(errorHandle);


app.listen(5000);
