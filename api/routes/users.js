const { response } = require('express');
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

router.get('/products',(req,res)=>{
  Functions.getAllData(collection.PRODUCTS_COLLECTION).then((response)=>{
    console.log(response)
    res.send({response})
  })
})

router.post('/add-to-cart/:userid/:proid',(req,res)=>{
  console.log("product id");
  console.log(req.params.proid)
  console.log(req.params.userid)
  

  var proArr = [];
  proArr.push(req.params.proid);
  var obj={
    "userid":req.params.userid,
    "proid":proArr,
  }

  Functions.checkCart(obj).then((response)=>{
    console.log(response)
    if(response){
      console.log("response not null")
      var arr = response.proid
      arr.push(req.params.proid)
      console.log(arr)
      var newObj={
        "userid":response.userid,
        "proid":arr,
      }
      Functions.updateCart(newObj).then((resp)=>{
        console.log(resp)
        res.send(newObj)
      })

    }else{
      
      Functions.addData(collection.CART_COLLECTION,obj).then((response)=>{
        console.log(response)
        res.send(obj)
        
      })
    }
  })
  


})

router.get('/cart/:userid',(req,res)=>{
  console.log(req.params.userid)
  var obj={
    "userid":req.params.userid
  }
  Functions.checkCart(obj).then((response)=>{
    console.log(response)
    res.send({response})
  })
})

router.post('/which-product/:proid',(req,res)=>{
  console.log(req.params.proid)
  Functions.getDataById(collection.PRODUCTS_COLLECTION,req.params.proid).then((response)=>{
    res.send({response})
  })
})


module.exports = router;
