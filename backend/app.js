require('dotenv').config()
const express =require('express');
const app=express()
const session=require('express-session')
const userroute =require('./routes/userroute')
const cart=require('./routes/cart')
const order=require('./routes/order')
const bodyParser =require('body-parser')
const products=require('./routes/products')
const stripeRoute = require("./routes/stripe");
const connection = require("./db");
const MongodbSession = require('connect-mongodb-session')(session);
const cors = require('cors');
 app.use(bodyParser.urlencoded({extended:true}));
 app.use(bodyParser.json())
 //app.use(express.static(''))>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 

 connection();

 app.use(cors());
const store=new MongodbSession({
    uri:process.env.DB,
    collection:"mySessions",
});
app.use(
    session({
        secret:"thet key",
        resave:false,
        saveUninitialized:false,
        store:store,
    })
)



 
 
app.use('/api/user', userroute)//for users

app.use('/api/products',products)//for products

app.use('/api/cart',cart)

app.use('/api/order',order)

app.use("/api/checkout", stripeRoute);



app.listen(5000,()=>{
    console.log ('connected to port 5000');
})
