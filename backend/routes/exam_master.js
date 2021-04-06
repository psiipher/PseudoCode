const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');



router.get('/edu',auth,(req,res)=>{

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

router.get('/exam',auth,(req,res)=>{

    let table_query = "SELECT master_exam.id,master_exam.exam_name,master_exam.exam_date,master_exam.expiry_date,master_exam.visibility_erp_exam,education_master.edu_name from master_exam INNER JOIN education_master on master_exam.edu_exam_name = education_master.edu_id ";

    db.query(table_query, (err, result) => {

            
        if (err) {
            return res.status(500).json({errors:[{msg:'Query Error'}]})
        }
        else{
           
            for(var i=0;i<result.length;i++)
            {
                result[i].exam_date = new Date(result[i].exam_date);
            }
            res.json(result);

            
        }


    });


});

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

router.post('/',auth,(req,res) => {

    let {exam_name, edu_exam_name,exam_date,expiry_date,visibility_erp_exam} = req.body;

    if (visibility_erp_exam == true) {
        visibility_erp_exam = 1;
    }
    else{
        visibility_erp_exam = 0;
    }
    exam_date = formatDate(exam_date);
    expiry_date = formatDate(expiry_date);
    
    
    let query =  "INSERT INTO `master_exam` (`id`, `exam_name`, `edu_exam_name`,`exam_date`,`expiry_date`,`visibility_erp_exam`) VALUES (NULL,'"+ exam_name + "','"+ edu_exam_name + "','"+ exam_date + "','"+ expiry_date + "','"+ visibility_erp_exam + "')" ;
    
    
    

    db.query(query, (err, result) => {

            
        if (err) {
            return res.status(500).json({errors:[{msg:err}]})
        }
        else{
            res.json({msg:`Exam Added`});

        
    

            }
});

});




router.post('/edit/:exam_id',auth,(req,res) => {

    let {exam_name, edu_exam_name,exam_date,expiry_date,visibility_erp_exam} = req.body;

    let exam_id = req.params.exam_id;

    if (visibility_erp_exam == true) {
        visibility_erp_exam = 1;
    }
    else{
        visibility_erp_exam = 0;
    }
    exam_date = formatDate(exam_date);
    expiry_date = formatDate(expiry_date);

    let query =  "UPDATE  `master_exam` SET exam_name='" + exam_name + "',edu_exam_name='" + edu_exam_name + "',exam_date='" + exam_date + "',expiry_date='" + expiry_date + "',visibility_erp_exam='" + visibility_erp_exam + "'  WHERE id= '" + exam_id +  "' " ;
    
    
    

    db.query(query, (err, result) => {

            
        if (err)
         {
            return res.status(500).json({errors:[{msg:err}]})
        }
        else{
            res.json({msg:`Exam Updated`}); 
        }  
            
});

});









router.delete('/:exam_id',auth,(req,res) => {

    

    let exam_id = req.params.exam_id;

    let query =  "DELETE FROM  `master_exam` WHERE id = '" + exam_id + "'" ;
    
    
    

    db.query(query, (err, result) => {

            
        if (err)
         {
            return res.status(500).json({errors:[{msg:err}]})
        }
        else{
            res.json({msg:`Exam Deleted`});   
            }
});

});










module.exports = router;