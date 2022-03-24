

const mongoose=require('mongoose');
const usersSchema=new mongoose.Schema({
    mail:{type:String,required:true},username:{type:String,required:true},password:{type:String,required:true},isAdmin:{type:Boolean,default:false},img:{type:String,default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"},
    phoneNumber:{type:String,default:"020"},title:{type:String,default:"none"},birthDate:{type:Date,default:Date.now},address:{type:String,default:"none"}
},{timestamps:true})
module.exports= mongoose.model('users',usersSchema)