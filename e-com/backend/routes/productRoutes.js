import express from 'express';
import { getProducts,getProdctsById } from '../controller/productsController.js';

const router = express.Router();

router.route("/").get(getProducts);

router.route("/:id").get(getProdctsById);



export default router;