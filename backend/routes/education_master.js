const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');



router.get('/',auth,(req,res)=>{

    let table_query = "SELECT * FROM education_master";

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

    let {edu_name,visibility_erp_edu} = req.body;

    if (visibility_erp_edu == true) {
        visibility_erp_edu = 1;
    }
    else{
        visibility_erp_edu = 0;
    }

    let query =  "INSERT INTO `education_master` (`edu_id`, `edu_name`, `visibility_erp_edu`) VALUES (NULL,'"+ edu_name + "','"+ visibility_erp_edu + "')" ;
    
    
    

    db.query(query, (err, result) => {

            
        if (err) {
            return res.status(500).json({errors:[{msg:err}]})
        }
        else{
            res.json({msg:`Education Added`});

        
    

            }
});

});




router.post('/edit/:edu_id',auth,(req,res) => {

    let {edu_name,visibility_erp_edu} = req.body;

    
    if (visibility_erp_edu == true) {
        visibility_erp_edu = 1;
    }
    else{
        visibility_erp_edu = 0;
    }

    let edu_id = req.params.edu_id;
    let query =  "UPDATE  `education_master` SET edu_name='" + edu_name + "',visibility_erp_edu='" + visibility_erp_edu + "'  WHERE edu_id= '" + edu_id +  "' " ;
    
    
    

    db.query(query, (err, result) => {

            
        if (err)
         {
            return res.status(500).json({errors:[{msg:err}]})
        }
        else{
            res.json({msg:`Education Updated`}); 
        }  
            
});

});









router.delete('/:edu_id',auth,(req,res) => {

    

    let edu_id = req.params.edu_id;

    let query =  "DELETE FROM  `education_master` WHERE edu_id = '" + edu_id + "'" ;
    
    
    

    db.query(query, (err, result) => {

            
        if (err)
         {
            return res.status(500).json({errors:[{msg:err}]})
        }
        else{
            res.json({msg:`Education Deleted`});   
            }
});

});










module.exports = router;