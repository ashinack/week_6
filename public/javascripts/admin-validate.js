$(document).ready(function(){
    $("#form2").validate({
        errorClass:"err",
     rules:{
        name1:{
            required:true,
            minlength:4,
            maxlength:15,
            namevalidation:true
        },
         email1:{
            required:true,
            email:true
        },
         address1:{
            required:true,
            minlength:10
        },
       
       
        number1:{
            required:true,
            minlength:10,
            maxlength:15
        },
       

       
        
     },
     messages:{
         name1:{
             required:"Please enter your name",
             minlength:"At least 4 characters required",
             maxlength:"Maximum 15 characters are allowed"
         },
         email1:{
             required:"Please enter your email id",
             email:"Enter a valid email"
         },
         
         
         number1:{
            required:"Please enter your phone number",
            minlength:"Enter 10 numbers",
            maxlength:"Number should be less than or equal to 15 numbers"
           },
         
         address1:"Please enter your address",
         
     }
    })
    $.validator.addMethod("namevalidation", function(value, element) {
            return /^[A-Za-z]+$/.test(value);
    },
      "Sorry,only alphabets are allowed"
   );
})
