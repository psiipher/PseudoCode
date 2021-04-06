const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');



router.get('/',auth,(req,res)=>{

    let table_query = "SELECT * FROM duration_master";

    db.query(table_query, (err, result) => {

            
        if (err) {
            return res.status(500).json({errors:[{msg:'Query Error'}]})
        }
        else{
           
            res.json(result);

            
        }


    });


});




router.post('/',auth,(req,res) => {

    let {actual_duration, name_duration,nature_duration,visibility_erp_duration} = req.body;

    if (visibility_erp_duration == true) {
        visibility_erp_duration = 1;
    }
    else{
        visibility_erp_duration = 0;
    }
    
    
    let query =  "INSERT INTO `duration_master` (`id`, `actual_duration`, `name_duration`,`visibility_erp_duration`,`nature_duration`) VALUES (NULL,'"+ actual_duration + "','"+ name_duration + "','"+ visibility_erp_duration + "','"+ nature_duration +"')" ;
    
    
    

    db.query(query, (err, result) => {

            
        if (err) {
            return res.status(500).json({errors:[{msg:err}]})
        }
        else{
            res.json({msg:`duration Added`});

        
    

            }
});

});




router.post('/edit/:duration_id',auth,(req,res) => {

    let {actual_duration, name_duration,nature_duration,visibility_erp_duration} = req.body;

    if (visibility_erp_duration == true) {
        visibility_erp_duration = 1;
    }
    else{
        visibility_erp_duration = 0;
    }

    let duration_id = req.params.duration_id;

    let query =  "UPDATE  `duration_master` SET actual_duration='" + actual_duration + "',name_duration='" + name_duration + "',nature_duration='" + nature_duration + "',visibility_erp_duration='" + visibility_erp_duration + "'  WHERE id= '" + duration_id +  "' " ;
    
    
    

    db.query(query, (err, result) => {

            
        if (err)
         {
            return res.status(500).json({errors:[{msg:err}]})
        }
        else{
            res.json({msg:`duration Updated`}); 
        }  
            
});

});









router.delete('/:duration_id',auth,(req,res) => {

    

    let duration_id = req.params.duration_id;

    let query =  "DELETE FROM  `duration_master` WHERE id = '" + duration_id + "'" ;
    
    
    

    db.query(query, (err, result) => {

            
        if (err)
         {
            return res.status(500).json({errors:[{msg:err}]})
        }
        else{
            res.json({msg:`Duration Deleted`});   
            }
});

});










module.exports = router;