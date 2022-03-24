const express=require('express');
const router=express.Router();
const { getAllCarts,getCart,createCart,deleteCart,updateCart }=require('../controller/Cart');
const { verifyadmin, verifyToken, verifyAuthrisation } = require('../middleware/authnticate');
router.route('/').get(verifyadmin,getAllCarts).post(verifyToken,createCart)
router.route('/find/:userId').get(getCart).patch(verifyAuthrisation,updateCart).delete(verifyAuthrisation,deleteCart)
module.exports=router