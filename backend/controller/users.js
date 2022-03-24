const CryptoJS=require("crypto-js")
const express =require('express');
const app=express()
const Users=require('../models/users')
const jwt=require('jsonwebtoken');



//edit user
const updateUser=async(req,res)=>{
    if(req.body.password){
        req.body.password= CryptoJS.AES.encrypt(req.body.password, process.env.PASS)
    }
const updatedUser=await Users.findByIdAndUpdate(req.params.id,{
    $set:req.body
},{new:true})
res.json(updatedUser)
}

//register
const register=(req,res)=>{
Users.find({mail:req.body.mail}).then(resp=>{
    if(resp.length!=0){
        return res.json({msg:"mail exists"})
    }

    else{
        const users= Users.create({
            mail:req.body.mail,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS),
            username:req.body.username
        
        })
        
        
        res.json({users}) 
    }}) 



}

//login
const login=async (req,res)=>{
    
    try
{
  const user=  await Users.findOne({
        mail:req.body.mail,
        
      })
if(!user){
    return res.status(401).json("reqiured field");
}
      const hashedpassword=CryptoJS.AES.decrypt(user.password,process.env.PASS);
      const originalpassword=hashedpassword.toString(CryptoJS.enc.Utf8);
   
     if(originalpassword!==req.body.password ){
       return res.status(401).json("wrong password");
     }
       
       
            const accessToken=jwt.sign({
               
                id:user._id,
                isAdmin:user.isAdmin
            },process.env.JWTSEC,
            {expiresIn:36000000}
            );
            const { password, ...others } = user._doc;


            res.status(200).json({...others, accessToken});
   
        }
        catch(err){
            return res.json(err)
        }
    }

const allUseres=async(req,res)=>{
    const query = req.query.new;
    try {
      const users = query
        ? await Users.find().sort({ _id: -1 }).limit(5)
        : await Users.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
   
}

const deleteUser=async(req,res)=>{
    try{
   await Users.findByIdAndDelete(req.params.id)
    return res.status(200).json("user has been deleted")


    }catch(err){
res.status(500).send(err)
    }
}
const getUser=async(req,res)=>{
    try{
        const user=await Users.findById(req.params.id)
        const{ password, ...others }=user._doc
    return res.status(200).json(others)


    }catch(err){
res.status(500).send(err)
    }
}

const states=async(req,res)=>{
    const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await Users.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports={
    register,
    login,
    allUseres,
    deleteUser,
    updateUser,
    getUser,
    states
   
}