const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');

router.get('/sub1',auth,(req,res)=>{

    let query = "SELECT studyroom_name,address_firstline,address_landmark,address_city_id,address_state_id,address_pincode,year from vendor_master WHERE vendor_id='" + req.id  + "' ";

    db.query(query, (err, result) => {

            
        if (err) {
            return res.status(500).json({errors:[{msg:'Query Error'}]})
        }
        else{

            res.json(result[0]);
        }
    });
});


router.post('/sub1',auth,(req,res) => {

    let {studyroomname,add1,add2,city,state,postal,year} = req.body;

    let query =  "UPDATE vendor_master SET address_firstline='" + add1 + "',address_landmark='" + add2 + "',address_city_id='" + city + "',address_state_id='" + state + "',address_pincode='" + postal + "',year='" + year + "'  WHERE vendor_id= '" + req.id +  "' " ;
    
    
    

    db.query(query, (err, result) => {

            
        if (err) {
            return res.status(500).json({errors:[{msg:'Query Error'}]})
        }
        else{
            //res.json({msg:`User Registered with id ${result.insertId}`});
        
    let query1 =  "SELECT * from vendor_master where vendor_id='"+req.id+"'";

    db.query(query1, (err, result) => {

            
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
                        add1:result[0].address_firstline,
                        add2:result[0].address_landmark,
                        city:result[0].address_city_id,
                        state:result[0].address_state_id,
                        postal:result[0].address_pincode,
                        year:result[0].year
                     }
                 }

                 jwt.sign(payload,config.get('jwtSecret'),{expiresIn:360000 },(err,token)=>{
                    if(err)
                    {
                        throw err;
                    }
        
                    res.json({token});
                    sendtoken(token,req.id);
                    res.redirect(req.get('referer'));
                })
            
        }
    });

}
});




});



router.post('/sub2',auth,(req,res) => {

    let {ac_start,ac_end,ac_start_type,ac_end_type,ac_nonac,seat,description,weekday_start,weekday_end,weekday_start_type,weekday_end_type,weekend_start,weekend_end,weekend_start_type,weekend_end_type} = req.body;

    if(ac_nonac === 'Non AC')
    {
        ac_start='0';
        ac_end='0';
        ac_start_type='0';
        ac_end_type='0';
    }

    console.log(weekday_start_type);

    let query =  "UPDATE vendor_master SET ac_start='" + ac_start + "',ac_end='" + ac_end + "',ac_start_type='" + ac_start_type + "',ac_end_type='" + ac_end_type + "',ac_nonac='" + ac_nonac + "',seat='" + seat + "',description='" + description + "',weekday_start='" + weekday_start + "',weekday_end='" + weekday_end + "',weekday_start_type='" + weekday_start_type + "',weekday_end_type='" + weekday_end_type + "',weekend_start='" + weekend_start + "',weekend_end='" + weekend_end + "',weekend_start_type='" + weekend_start_type + "',weekend_end_type='" + weekend_end_type + "'  WHERE vendor_id= '" + req.id +  "' " ;
    
    
    

    db.query(query, (err, result) => {

            
        if (err) {
            return res.status(500).json({errors:[{msg:'Query Error'}]})
        }
        else{
            //res.json({msg:`User Registered with id ${result.insertId}`});
        
    let query1 =  "SELECT * from vendor_master where vendor_id='"+req.id+"'";

    db.query(query1, (err, result) => {

            
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
                        add1:result[0].address_firstline,
                        add2:result[0].address_landmark,
                        city:result[0].address_city_id,
                        state:result[0].address_state_id,
                        postal:result[0].address_pincode,
                        year:result[0].year,
                        ac_start:result[0].ac_start,
                        ac_end:result[0].ac_end,
                        ac_start_type:result[0].ac_start_type,
                        ac_end_type:result[0].ac_end_type,
                        ac_nonac:result[0].ac_nonac,
                        seat:result[0].seat,
                        desc:result[0].desc,
                        weekday_start:result[0].weekday_start,
                        weekday_end:result[0].weekday_end,
                        weekday_start_type:result[0].weekday_start_type,
                        weekday_end_type:result[0].weekday_end_type,
                        weekend_start:result[0].weekday_start,
                        weekend_end:result[0].weekend_end,
                        weekend_start_type:result[0].weekend_start_type,
                        weekday_end_type:result[[0].weekday_end_type]

                     }
                 }

                 jwt.sign(payload,config.get('jwtSecret'),{expiresIn:360000 },(err,token)=>{
                    if(err)
                    {
                        throw err;
                    }
        
                    res.json({token});
                    sendtoken(token,req.id);
                    res.redirect(req.get('referer'));
                })
            
        }
    });

}
});




});

router.get('/sub2',auth,(req,res)=>{

    let query = "SELECT ac_start,ac_end,ac_start_type,ac_end_type,ac_nonac,seat,description,weekday_start,weekday_end,weekday_start_type,weekday_end_type,weekend_start,weekend_end,weekend_start_type,weekend_end_type from vendor_master WHERE vendor_id='" + req.id  + "' ";

    db.query(query, (err, result) => {

            
        if (err) {
            return res.status(500).json({errors:[{msg:'Query Error'}]})
        }
        else{

            res.json(result[0]);
        }
    });

    



});


router.post('/sub3',auth,(req,res) => {

    let { ac,medical,dining,locker,computer,fingerprint,parking,elevator,fire_ext,discussion_room,wheelchair,public_transport,library,cctv} = req.body;

    var query = "SELECT * FROM vendor_amenities;";
    if(ac === true)
    {
        query+=`INSERT INTO vendor_amenities (id,vendor_id,amenity_id) VALUES (NULL,${req.id},1);`; 
    }

    if(dining === true)
    {
        query+=`INSERT INTO vendor_amenities (id,vendor_id,amenity_id) VALUES (NULL,${req.id},2);`; 
    }

    if(computer === true)
    {
        query+=`INSERT INTO vendor_amenities (id,vendor_id,amenity_id) VALUES (NULL,${req.id},3);`; 
    }

    if(parking === true)
    {
        query+=`INSERT INTO vendor_amenities (id,vendor_id,amenity_id) VALUES (NULL,${req.id},4);`; 
    }

    if(fire_ext === true)
    {
        query+=`INSERT INTO vendor_amenities (id,vendor_id,amenity_id) VALUES (NULL,${req.id},5);`; 
    }

    if(wheelchair === true)
    {
        query+=`INSERT INTO vendor_amenities (id,vendor_id,amenity_id) VALUES (NULL,${req.id},6);`; 
    }

    if(library === true)
    {
        query+=`INSERT INTO vendor_amenities (id,vendor_id,amenity_id) VALUES (NULL,${req.id},7);`; 
    }

    if(medical === true)
    {
        query+=`INSERT INTO vendor_amenities (id,vendor_id,amenity_id) VALUES (NULL,${req.id},8);`; 
    }

    if(locker === true)
    {
        query+=`INSERT INTO vendor_amenities (id,vendor_id,amenity_id) VALUES (NULL,${req.id},9);`; 
    }

    if(fingerprint === true)
    {
        query+=`INSERT INTO vendor_amenities (id,vendor_id,amenity_id) VALUES (NULL,${req.id},10);`; 
    }

    if(elevator === true)
    {
        query+=`INSERT INTO vendor_amenities (id,vendor_id,amenity_id) VALUES (NULL,${req.id},11);`; 
    }

    if(discussion_room === true)
    {
        query+=`INSERT INTO vendor_amenities (id,vendor_id,amenity_id) VALUES (NULL,${req.id},12);`; 
    }

    if(public_transport === true)
    {
        query+=`INSERT INTO vendor_amenities (id,vendor_id,amenity_id) VALUES (NULL,${req.id},13);`; 
    }

    if(cctv === true)
    {
        query+=`INSERT INTO vendor_amenities (id,vendor_id,amenity_id) VALUES (NULL,${req.id},14);`; 
    }




    db.query(query, (err, result) => {

            
        if (err) {
            return res.status(500).json({errors:[{msg:err}]})
        }
        else{
            

        res.send('true');

}






});

});

router.get('/sub3',auth,(req,res)=>{

    

    let query = "SELECT * FROM `amenities_master` WHERE visibility_flag = 1";

    db.query(query, (err, result) => {

            
        if (err) {
            return res.status(500).json({errors:[{msg:'Query Error'}]})
        }
        else{

            res.json(result);
        }
    });

    



});;

   

    








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