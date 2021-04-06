const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');



//  @route    /api/auth
//  @desc     authorize the user
//  @access   public
//  @type     POST

router.post('/register',async (req,res)=>{

    let {email,password,firstname,lastname,personalmobile,studyroomname,otp} = req.body;
   // console.log(req.body);
    try
    {
        let query =  "INSERT INTO `vendor_master` (`vendor_id`, `first_name`, `last_name`, `mobile_vendor`, `studyroom_name`, `email`, `password`, `otp`) VALUES (NULL,'"+ firstname + "','"+ lastname + "', '"+ personalmobile + "', '"+ studyroomname + "', '"+ email + "','"+ password + "','"+ otp + "')";
        
        db.query(query, (err, result) => {

            
            if (err) {
                return res.status(500).json({errors:[{msg:'Query Error'}]})
            }
            else{
                res.json({msg:`User Registered with id ${result.insertId}`});
            }


            
            
});  

       
    }catch(err)
    {

        if(err)
        {
            console.log(err.message);
            res.status(500).send('Server Error');
        }
    }
    

});



//  @route    /api/login
//  @desc     user login
//  @access   public
//  @type     POST

router.post('/login',async (req,res)=>{

    let {email,password} = req.body;
    try
    {
        let query =  "SELECT * from vendor_master where email='"+email+"'";
        
        db.query(query, (err, result) => {

            
            if (err) {
                return res.status(500).json({errors:[{msg:'Query Error'}]})
            }
            else{

                 if(!result[0])
                 {
                     return  res.status(400).json({errors:[{msg:'Invalid Credentials'}]});
                 }

                 const payload = {
                     vendor_profile:{
                         id:result[0].vendor_id,
                         first_name:result[0].first_name,
                         last_name:result[0].last_name,
                         mobile_vendor:result[0].mobile_vendor,
                         studyroom_name:result[0].studyroom_name,
                         email:result[0].email,
                         registration_date:result[0].registration_date,
                         gst_number:result[0].gst_number,

                     }
                 }

                 //Extract user id to request parameter
                 //req.id = result[0].vendor_id;

                 if(password === result[0].password)//Password Match
                 {
                    //res.json({"profile":result[0]});
                    jwt.sign(payload,config.get('jwtSecret'),{expiresIn:360000 },(err,token)=>{
                        if(err)
                        {
                            throw err;
                        }
            
                        res.json({token});
                        sendtoken(token,result[0].vendor_id);
                    })
                    
                 }
                 else
                 {
                    return  res.status(400).json({errors:[{msg:'Invalid Credentials'}]});
                 }
               // res.json({"password":result[0].password});
            }


            
            
});  

       
    }catch(err)
    {

        if(err)
        {
            console.log(err.message);
            res.status(500).send('Server Error');
        }
    }
    

});


function sendtoken(token,id)
{
    let query = "UPDATE vendor_master SET jwt_token='" + token + "'  WHERE vendor_id= '" + id +  "' " ;
    
    db.query(query, (err, result) => {

            
        if (err) {
            return res.status(500).json({errors:[{msg:'Query Error'}]})
        }
        else{
            console.log("token stored in database");
        }


    });
}

module.exports = router;