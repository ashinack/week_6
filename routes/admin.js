var express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const { response } = require('../app');
var router = express.Router();
const userHelpers=require('../helpers/user-helpers')
var producthelpers=require('../helpers/login-helpers');
const loginHelpers = require('../helpers/login-helpers');



/* GET users listing. */
router.get('/', function(req, res, next) {
  
   userHelpers.getAllUsers().then((userdata)=>{
     console.log(userdata);
      res.render('admin/tableview',{admin:true,userdata})
   })
 
});
router.get('/delete/:id',(req,res)=>{
  let proId=req.params.id
  console.log(proId);
  userHelpers.deleteProduct(proId).then((response)=>{
    res.redirect('/admin/')
  })
 
})
router.get('/edit/:id',async (req,res)=>{
  let user=await userHelpers.getUserDetails(req.params.id)
  console.log(user);
  res.render('admin/edituser',{admin:true,user})
})
router.post('/edit/:id',(req,res)=>{
  console.log(req.params.id)
  
  userHelpers.updateUser(req.params.id,req.body).then(()=>{
    res.redirect('/admin/')
  })
})

router.get('/data/',(req,res)=>{
  console.log(req.body)
  res.render('admin/admin-data',{admin:true});
})



router.post('/submit/',(req,res)=>{

  userHelpers.doSubmit(req.body).then((adminData)=>{
   console.log(req.body);
  
   res.redirect('/admin/')
  })
})

router.get('/ad-login/',(req,res)=>{
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  if(req.session.loggedIn){
    res.redirect('/admin/')
  }else

  res.render('admin/admin-login',{'adminErr':req.session.adminErr});
  req.session.adminErr=false
  
})

// const username = 'ashina'
// const password = 'password'

// router.post('/signin/',(req,res)=>{
//   console.log(req.body)
//      const name= req.body.name
//      const pw = req.body.password
//       if (name === username && pw === password){
//     req.session.admin=true
//      res.redirect('/admin')
//   }else{
//     req.session.adminErr=true;
//      req.session.adminErr="Invalid username or password"
//     res.redirect('/admin/ad-login/')
    

//   }
     
    
    
  
// })

router.post('/signin/',(req,res)=>{
  console.log(req.body)
  loginHelpers.doAdminLogin(req.body).then((response)=>{
    if(response.status){
      req.session.loggedIn=true
      req.session.admin=response.admin
      res.redirect('/admin')
    }else{
      req.session.adminErr="Invalid username or password"
      res.redirect('/admin/ad-login/')
    }
  })
})

router.get('/adminlogout/',(req,res)=>{
  req.session.destroy()
  res.redirect('/admin/ad-login/')
})

 



module.exports = router;
