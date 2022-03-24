const Cart=require('../models/cart')

const getAllCarts=async(req,res)=>{
    try {
        const carts=await Cart.find()
        res.json(carts)
    } catch (error) {
        return res.status(500).send(error)
    }
}

//create product
const createCart=async(req,res)=>{const cart=await Cart.create(req.body)
    res.json({cart})}

    //get single product
const getCart=async(req,res)=>{

const cart=await Cart.findOne({userId:req.params.userId})
res.json ({cart})
}

//edit
const updateCart=async(req,res)=>{
    const {id:cartID}=req.params
const cart=await Cart.findOneAndUpdate({_id:cartID},req.body,{
    new:true,
    runValidators:true
})
res.json({cart})
}

//delete
const deleteCart=async(req,res)=>{
   
   await Cart.findOneAndDelete(req.params.id)
    res.json('deleted')
}

module.exports={
    getAllCarts,
    createCart,
    getCart,
    updateCart,
    deleteCart,
}