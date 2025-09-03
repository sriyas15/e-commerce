import express from "express";
import products from "./data/products.js";
import cors from 'cors';
import mongooseDB from "./config/db.js";
import productRoutes from './routes/productRoutes.js';

const PORT = 5000;
const app = express();
app.use(cors());

mongooseDB();

app.get("/", (req, res) => {
  res.send("API running...");
});

app.use("/api/products",productRoutes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
