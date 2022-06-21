const { response } = require('express');
var express = require('express');
var router = express.Router();
var producthelpers=require('../helpers/login-helpers')
const userHelpers=require('../helpers/user-helpers')

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.user){
  let user=req.session.user
  console.log(user);
   producthelpers.getAllProducts().then((products)=>{
    //  console.log(products);
      res.render('index',{products,user} );
   })
  }else{
    res.redirect("/login")
  }
  
});
router.get('/login',(req,res)=>{
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  if(req.session.loggedIn){
    res.redirect('/')
  }else{

res.render('user/login',{'loginErr':req.session.loginErr})
req.session.loginErr=false
  }
  
 
})
router.get('/signup',(req,res)=>{
  res.render('user/signup')
})


router.post('/signup',(req,res)=>{
  userHelpers.doSignup(req.body).then((response)=>{
    console.log(response);
    req.session.loggedIn=true
    req.session.user=response
    res.redirect('/')
  })
})
router.post('/login',(req,res)=>{
  userHelpers.doLogin(req.body).then((response)=>{
    if(response.status){
      req.session.loggedIn=true
      req.session.user=response.user
      res.redirect('/')
    }else{
      req.session.loginErr="Invalid username or password"
      res.redirect('/login')
    }
  })
})
router.get('/logout',(req,res)=>{
  req.session.destroy()
  res.redirect('/')
})


module.exports = router;
