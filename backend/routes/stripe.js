const express =require('express');
const router=express.Router()
const {payment}=require("../controller/stripe")
router.route("/payment").post(payment)

module.exports=router;