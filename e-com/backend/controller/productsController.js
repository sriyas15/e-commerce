import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../model/productModel.js";

const getProducts = asyncHandler(async(req, res) => {

    const products = await Product.find({});
    res.json(products);
  
});

const getProdctsById = asyncHandler(async (req,res)=>{

    const data = await Product.findById(req.params.id);
    res.json(data);
 
});

export { getProducts,getProdctsById }