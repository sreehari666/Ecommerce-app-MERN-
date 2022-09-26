var express = require('express');
var router = express.Router();
const collection=require('../config/collection');
const Functions = require('../functions/function');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login',(req,res)=>{
  console.log("call");
  console.log(req.body)
  if(req.body){
    Functions.doLogin(collection.USER_COLLECTION,req.body).then((response)=>{
      console.log(response)
      if(response.status == true){
        res.send({userid:response.user._id,message:"Login successful"})
      }else{
        res.send({userid:null,message:"Something went wrong"})
      }
    })

  }else{
    res.sendStatus(500)
  }
})

router.post('/signup',(req,res)=>{
  
  if(req.body){
    console.log(req.body)
    var obj={
      name:req.body.username,
      email:req.body.email,
      password:req.body.password,
    }
    if(req.body.password == req.body.confirmPassword){
      Functions.checkUser(collection.USER_COLLECTION,obj).then((data)=>{
        
        console.log("data")
        console.log(data)
        if(data == null){
          Functions.doSignup(collection.USER_COLLECTION,obj).then((response)=>{
            temp = response.insertedId
            console.log(temp.toString())
            res.send({userid:temp.toString(),message:"Account created successfully"})
          })
        }else{
          res.send({userid:null,message:"You already have an account"})
        }
        
      })
      
      
    }else{
      res.send({userid:null,message:"Password does not match"})
    }
    
  }else{
    res.sendStatus(500)
  }
})



module.exports = router;
