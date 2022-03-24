const express=require('express');
const router=express.Router();
const { getAllOrders,getOrder,createOrder,deleteOrder,updateOrder,userIncome }=require('../controller/order');
const { verifyadmin, verifyToken, verifyAuthrisation } = require('../middleware/authnticate');
router.route('/').get(verifyadmin,getAllOrders).post(verifyToken,createOrder)
router.route('/find/:userId').get(getOrder).patch(verifyadmin,updateOrder).delete(verifyadmin,deleteOrder)
router.route('/income').get(verifyadmin,userIncome)
module.exports=router