var db=require('../config/connection')
var collection=require('../config/collections')
const bcrypt=require('bcrypt')

var objectId=require('mongodb').ObjectId
// const { promise, reject } = require('bcrypt/promises')
const async = require('hbs/lib/async')
module.exports={
    doSignup:(userData)=>{
        return new Promise(async(resolve,reject)=>{
          console.log(userData,"checking")
          userData.password=await bcrypt.hash(userData.password,10)
          db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data)=>{
            resolve(data.insertedId)
          })
        })
       

    },
    doLogin:(userData)=>{
      return new Promise(async(resolve,reject)=>{
        let loginStatus=false
        let response={}
        let user=await db.get().collection(collection.USER_COLLECTION).findOne({email:userData.email})
        if(user){
          bcrypt.hash(userData.password,user.password).then((status)=>{
            if(status){
              console.log('login sucess');
              response.user=user
              response.status=true
              resolve(response)
            }else{
              console.log('login failed');
              resolve({status:false})
            }
          })
        }else{
          console.log('login failed');
          resolve({status:false})
        }
      })
    },
     getAllUsers:()=>{
        return new Promise(async(resolve,reject)=>{
            let userdata=await db.get().collection(collection.USER_COLLECTION).find().toArray()
            resolve(userdata)
        })
    },
    deleteProduct:(proId)=>{
      return new Promise((resolve,reject)=>{
        db.get().collection(collection.USER_COLLECTION).deleteOne({_id:objectId(proId)}).then((response)=>{
          console.log(response);
          resolve(response)

        })
      })
    },
    getUserDetails:(proId)=>{
      return new Promise((resolve,reject)=>{
        db.get().collection(collection.USER_COLLECTION).findOne({_id:objectId(proId)}).then((user)=>{
          resolve(user);
        })
      })
    },
    updateUser:(proId,userDetails)=>{
      return new Promise((resolve,reject)=>{
        db.get().collection(collection.USER_COLLECTION)
        .updateOne({_id:objectId(proId)},{
          $set:{
            name:userDetails.name,
            email:userDetails.email,
            number:userDetails.number,
            // address:userDetails.address
          }
        }).then((response)=>{
          resolve()
        })
      })
    },
     doSubmit:(adminData)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.USER_COLLECTION).insertOne(adminData).then((data)=>{
                resolve(data.insertedId)
            })
        })
    }
    
}