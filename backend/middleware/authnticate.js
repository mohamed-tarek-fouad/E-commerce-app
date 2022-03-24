
const jwt=require("jsonwebtoken")

const verifyToken=(req,res,next)=>{
    const authHeader=req.headers.token
    if(authHeader){
        const token=authHeader.split(" ")[1]
        jwt.verify(token,process.env.JWTSEC,(err,user)=>{
            if(err) {return res.json("token is not valid")};

            req.user=user;
            next();

        });
    }else{
        return res.json("you are not authenticated")
    }
};

const verifyAuthrisation=(req,res,next)=>{
    verifyToken(req,res,()=>{
       
        if(req.user.id === req.params.id ){
            next()
        }
        else if (req.user.isAdmin) {
            next()
        } else {
            res.json("you are not allowed")
        }
        
    });
};

const verifyadmin=(req,res,next)=>{
    verifyToken(req,res,()=>{
       
        if(req.user.isAdmin){
            next()
        }else{
         
            res.json("you are not alowed")
        }
    });
};

module.exports={
    verifyToken,
    verifyAuthrisation,
    verifyadmin
}