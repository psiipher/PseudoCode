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

    let {first_name, last_name, mail_id,password,phone} = req.body;
    console.log(req.body);
    try
    {
        let query =  "INSERT INTO `user_master` (`user_id`, `first_name`, `last_name`, `phone`, `mail_id`, `password`) VALUES (NULL,'"+ first_name + "','"+ last_name + "', '"+ phone + "', '"+ mail_id + "','"+ password + "')";
        
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

    let {mail_id,password} = req.body;
    try
    {
        let query =  "SELECT * from user_master where mail_id='"+mail_id+"'";
        
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
                     user_profile:{
                         user_id:result[0].user_id,
                         first_name:result[0].first_name,
                         last_name:result[0].last_name,
                         phone:result[0].mobile_vendor,
                         mail_id:result[0].mail_id
                     }
                 }

                 //Extract user id to request parameter
                 //req.id = result[0].vendor_id;

                 if(password === result[0].password)//Password Match
                 {
                    //res.json({"profile":result[0]});
                    // jwt.sign(payload,config.get('jwtSecret'),{expiresIn:360000 },(err,token)=>{
                    //     if(err)
                    //     {
                    //         throw err;
                    //     }
            
                    //     res.json({token});
                    //     sendtoken(token,result[0].vendor_id);
                    // })
                    res.json({msg:`Welcome user`});
                    
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

//TODO

router.get('/todo/:username',async (req,res)=>{

    let username = req.params.username;

    let get_query = "SELECT todo_list FROM user_master WHERE mail_id ='" + username +  "'";

    db.query(get_query, (err, result) => {
            
        if (err) {
            return res.status(500).json({errors:[{msg:'Query Error'}]})
        }
        else{           
            res.json(result);            
        }
    });
});


router.post('/todo',async (req,res)=>{

    username = req.body.username;
    todo_list = req.body.todo_list;

    let post_query = "UPDATE  `user_master` SET todo_list='" + todo_list + "' WHERE mail_id= '" + username +  "' ";

    db.query(post_query, (err, result) => {
            
        if (err) {
            return res.status(500).json({errors:[{msg:'Query Error'}]})
        }
        else{           
            res.json(result);            
        }
    });
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