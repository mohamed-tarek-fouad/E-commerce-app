
const mongoose=require('mongoose');
module.exports=function Connection(){
mongoose.connect(process.env.DB,function (err){
    if (err){
        console.log(err);
    }
    else{
        console.log('connected to mongodb');
    }
});
}