let db=require('../config/connection')
const bcrypt=require('bcrypt')
const { ObjectId } = require('mongodb');
require("dotenv").config();



module.exports={
    doSignup:(collec,userData)=>{
        
        return new Promise(async(resolve,reject)=>{
            userData.password=await bcrypt.hash(userData.password,10)
            db.get().collection(collec).insertOne(userData).then((data)=>{
                console.log(data)
                resolve(data)
            })
            
        })

    },
    doLogin: (collec,userData) => {
        console.log(userData)
        return new Promise(async (resolve, reject) => {
            let response = {}
            let user = await db.get().collection(collec).findOne({ email: userData.email })
            if (user) {
                bcrypt.compare(userData.password, user.password).then((status) => {
                    if (status) {
                        console.log("login success")
                        response.user = user
                        response.status = true
                        resolve(response)
                    } else {
                        console.log("login failed")
                        resolve({ status: false })
                    }
                })
            } else {
                console.log("login failed")
                resolve({ status: false })
            }
        })
    },
    checkUser:(collec,userData)=>{
        return new Promise(async(resolve,reject)=>{
            
            db.get().collection(collec).findOne({email:userData.email}).then((data)=>{
               
                resolve(data)
            })
            
        })
    },
    addData:(collec,userData)=>{
        
        return new Promise(async(resolve,reject)=>{
    
            db.get().collection(collec).insertOne(userData).then((data)=>{
                console.log(data)
                resolve(data)
            })
            
        })

    },

    getAllData: (collec) => {
        return new Promise(async (resolve, reject) => {
            let _data = await db.get().collection(collec).find().toArray()
            resolve(_data)
        })
    },
    getDataById: (collec,userid)=>{
        return new Promise( (resolve, reject) => {
            db.get().collection(collec).findOne({_id:ObjectId(userid)}).then((data)=>{
                resolve(data)
            })
            
        })

    },
    editDataById: (collec,userid,data)=>{

        return new Promise( (resolve, reject) => {
            db.get().collection(collec).updateOne({_id:ObjectId(userid)},{
                $set:data  
            } 
            ).then((response)=>{
                resolve(response)
            })
            
        })
    },
    deleteDataById: (collec,userid)=>{
        return new Promise( (resolve, reject) => {
            db.get().collection(collec).deleteOne({_id:ObjectId(userid)}).then((response)=>{
                resolve(response)
            })
            
        })
    },
    checkCart:(Data)=>{
        
        return new Promise( (resolve, reject) => {
            db.get().collection('cart').findOne({userid:Data.userid}).then((data)=>{
                resolve(data)
            })
            
        })

    },
    updateCart:(Data)=>{
        
        return new Promise( (resolve, reject) => {
            db.get().collection('cart').updateOne({userid:Data.userid},{
                $set:{
                    "proid":Data.proid,
                }  
            } ).then((data)=>{
                resolve(data)
            })
            
        })

    },
    
}