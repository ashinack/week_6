var db=require('../config/connection')
var collection=require('../config/collections')

module.exports={
    // addProduct:(product,callback)=>{
    //     console.log(product);
    //     db.get().collection('product').insertOne(product).then((data)=>{
    //         console.log(data);
    //         callback(data);
    //     })
    // },
    getAllProducts:()=>{
        return new Promise(async(resolve,reject)=>{
            let products=await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
            resolve(products)
        })
    }, 
    doAdminLogin:(adminData)=>{
      return new Promise(async(resolve,reject)=>{
        let loginStatus=false
        let response={}
        let admin=await db.get().collection(collection.ADMIN_LOGIN).findOne({name:adminData.name})
        if(admin){
         
            if(adminData.password==admin.password){
              console.log('login sucess');
              response.admin=admin
              response.status=true
              resolve(response)
            }else{
              console.log('login failed');
              resolve({status:false})
            }
          
        }else{
          console.log('login failed');
          resolve({status:false})
        }
      })
    }
    
    
}