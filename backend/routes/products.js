const express=require('express');
const router=express.Router();
const { getAllProducts,getProduct,createProduct,deleteProduct,updateProduct }=require('../controller/products');
const { verifyadmin } = require('../middleware/authnticate');
router.route('/').get(getAllProducts).post(verifyadmin,createProduct)
router.route('/find/:id').get(getProduct).put(verifyadmin,updateProduct).delete(verifyadmin,deleteProduct)
module.exports=router