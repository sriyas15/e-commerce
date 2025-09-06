import express from 'express';
import Product from '../model/productModel.js';
import asyncHandler from '../middleware/asyncHandler.js';
// import notFound from '../errorHandle/errorHandle.js';

const router = express.Router();

router.get("/",asyncHandler(async(req, res) => {

    const products = await Product.find({});
    res.json(products);
  
}));

router.get("/:id",asyncHandler(async (req,res)=>{

    const data = await Product.findById(req.params.id);
    res.json(products);
 
}));



export default router;