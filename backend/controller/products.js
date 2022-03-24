const Product=require('../models/products')


//get all the products
const getAllProducts=async(req,res)=>{
    const qNew=req.query.new
    const qcategory= req.query.category
    let products;
    if(qNew){
        products=await Product.find().sort({createdAt:-1}).limit(5);
    }else if(qcategory){
products=await Product.find({
    cat:{
        $in:[qcategory],
    },
})
    }else{
        products=await Product.find()
    }

    
    res.json(products)
}

//create product
const createProduct=async(req,res)=>{const product=await Product.create(req.body)
    res.json({product})}

    //get single product
const getProduct=async(req,res)=>{
const {id:productID}=req.params
const product=await Product.findOne({_id:productID})
res.json ({product})
}

//edit
const updateProduct=async(req,res)=>{
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedProduct);
      } catch (err) {
        res.status(500).json(err);
      }
}

//delete
const deleteProduct=async(req,res)=>{
    const {id:productID}=req.params
    const product=await Product.findOneAndDelete({_id:productID})
    res.json({product:null})
}

module.exports={
    getAllProducts,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
}