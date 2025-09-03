import express from 'express';
import Product from '../model/productModel.js';
// import products from '../data/products.js';
import asycHandler from '../middleware/asyncHandler.js';

const router = express.Router();

router.get("/",asycHandler(async(req, res) => {
  try{
    const products = await Product.find({});
    res.json(products);

  }catch(e){
    console.log(`Error Occured ${e.message}`);
  }
}));

router.get("/:id",async (req,res)=>{

  try{
    const data = await Product.findById(req.params.id);
    res.json(products);
  }catch(e){
    console.log(`Error Occured ${e.message}`);
  }
})


export default router;