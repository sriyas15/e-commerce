import express from "express";
import cors from 'cors';
import mongooseDB from "./config/db.js";
import productRoutes from './routes/productRoutes.js';
import asyncHandler from "./middleware/asyncHandler.js";
import {notFound,errorHandle} from "./errorHandle/errorHandle.js";


const app = express();
app.use(cors());

mongooseDB();

app.get("/", asyncHandler((req, res) => {
  res.send("Home Page...");
}));

app.use("/api/products",productRoutes);
app.use(notFound);
app.use(errorHandle);


app.listen(5000);
