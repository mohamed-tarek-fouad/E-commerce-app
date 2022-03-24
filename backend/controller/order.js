const Order=require('../models/order')

const getAllOrders=async(req,res)=>{
    try {
        const order=await Order.find()
        res.json(order)
    } catch (error) {
        return res.status(500).send(error)
    }
}

//create order
const createOrder=async(req,res)=>{const order=await Order.create(req.body)
    res.json({order})}

    //get user orders
const getOrder=async(req,res)=>{

const order=await Order.findOne({userId:req.params.userId})
res.json ({order})
}

//edit
const updateOrder=async(req,res)=>{
    const {id:orderID}=req.params
const order=await Order.findOneAndUpdate({_id:orderID},req.body,{
    new:true,
    runValidators:true
})
res.json({order})
}

//delete
const deleteOrder=async(req,res)=>{
   
   await Cart.findOneAndDelete(req.params.id)
    res.json('Order has been deleted')
}
//monthly income
const userIncome=async(req,res)=>{
    const productId = req.query.pid;
    const date=new Date();
    const lastMonth=new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth=new Date(new Date().setMonth(lastMonth.getMonth() - 1));
    try {
        const income = await Order.aggregate([
          {
            $match: {
              createdAt: { $gte: previousMonth },
              ...(productId && {
                products: { $elemMatch: { productId } },
              }),
            },
          },
          {
            $project: {
              month: { $month: "$createdAt" },
              sales: "$amount",
            },
          },
          {
            $group: {
              _id: "$month",
              total: { $sum: "$sales" },
            },
          },
        ]);
        res.status(200).json(income);
      } catch (err) {
        res.status(500).json(err);
      }
}



module.exports={
    getAllOrders,
    createOrder,
    getOrder,
    updateOrder,
    deleteOrder,
    userIncome
}