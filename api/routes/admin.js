var express = require('express');
var router = express.Router();
const collection=require('../config/collection');
const Functions = require('../functions/function');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("admin");
});

router.post('/admin-login',(req,res)=>{
    console.log(req.body);
    if(req.body){
        Functions.doLogin(collection.ADMIN_COLLECTION,req.body).then((response)=>{
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

router.post('/add-product',(req,res)=>{
    console.log(req.body)

    if(req.body){
      Functions.addData(collection.PRODUCTS_COLLECTION,req.body).then((response)=>{
        console.log(response)
        res.send({message:"success"})

      })
    }

    
})

router.post('/edit-product/:id',(req,res)=>{
  console.log(req.body)
  console.log(req.params.id)
  if(req.body){
    Functions.editDataById(collection.PRODUCTS_COLLECTION,req.params.id,req.body).then((response)=>{
      console.log(response)
      res.send({message:"success"})

    })
  }

  
})

router.get('/products',(req,res)=>{
  Functions.getAllData(collection.PRODUCTS_COLLECTION).then((response)=>{
    console.log(response)
    res.send({response})
  })
})

router.post('/delete-product/:id',(req,res)=>{
 
  console.log(req.params.id)
  if(req.params.id){
    Functions.deleteDataById(collection.PRODUCTS_COLLECTION,req.params.id).then((response)=>{
      console.log(response)
      if(response.deletedCount==1){
        res.send({message:"success",status:true})  
      }else{
        res.send({message:"fail",status:false})
      }
      

    })
  }

  
})

module.exports = router;
