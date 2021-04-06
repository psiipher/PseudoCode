const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');



router.get('/',auth,(req,res)=>{

    let table_query = "SELECT * FROM information_schema.tables WHERE table_schema = 'peer_tag' AND table_name ='" + req.id + "_study_subs_master'  LIMIT 1 ";

    //'" + req.id + "_study_subs_master'

    db.query(table_query, (err, result) => {

            
        if (err) {
            return res.status(500).json({errors:[{msg:'Query Error'}]})
        }
        else{
           // res.send(result[0]);
            if(result[0] == null)
            {
                //console.log(req.id);
                create_table(req.id,res);
                //res.send('Table CReated');
            }
            else
            {
                send_data(req.id,res);
            }
            

            //res.send('Get data to be send on Batch master page');

            
        }


    });


});


router.post('/',auth,(req,res) => {

    let {batchname,batch_desc,batch_type,plan_type,time_start,time_end,time_start_string,time_end_string,fees,duration,visibility_erp,visibility_online} = req.body;

    if (visibility_erp == true) {
        visibility_erp = 1;
    }
    else{
        visibility_erp = 0;
    }

    if (visibility_online == true) {
        visibility_online = 1;
    }
    else{
        visibility_online = 0;
    }
    
    let query =  "INSERT INTO `" + req.id + "_study_subs_master` (`id`, `vendor_id`, `batch_name`, `batch_description`, `plan_type`, `timing_from`, `timing_to`, `timing_from_string`, `timing_to_string`, `fees`,`duration`,`batch_type`,`visibility_erp`,`visibility_online`) VALUES (NULL,'"+ req.id + "','"+ batchname + "', '"+ batch_desc + "', '"+ plan_type + "', '"+ time_start + "','"+ time_end + "', '"+ time_start_string + "','"+ time_end_string + "','"+ fees + "','"+ duration + "','"+ batch_type +"' ,'"+ visibility_erp + "','"+ visibility_online + "')" ;
    
    
    

    db.query(query, (err, result) => {

            
        if (err) {
            return res.status(500).json({errors:[{msg:err}]})
        }
        else{
            res.json({msg:`Batch Added`});

        
    

            }
});

});


router.post('/:batch_id',auth,(req,res) => {

    let {batchname,batch_desc,batch_type,plan_type,time_start,time_end,time_start_string,time_end_string,fees,duration,visibility_erp,visibility_online} = req.body;

    if (visibility_erp == true) {
        visibility_erp = 1;
    }
    else{
        visibility_erp = 0;
    }

    if (visibility_online == true) {
        visibility_online = 1;
    }
    else{
        visibility_online = 0;
    }
    
    let batch_id = req.params.batch_id;

    let query =  "UPDATE  `" + req.id + "_study_subs_master` SET batch_name='" + batchname + "',batch_description='" + batch_desc + "',plan_type='" + plan_type + "',timing_from='" + time_start + "',timing_to='" + time_end + "',timing_from_string='" + time_start_string + "',timing_to_string='" + time_end_string + "',fees='" + fees + "',duration='" + duration + "',batch_type='" + batch_type + "',visibility_erp='" + visibility_erp + "',visibility_online='" + visibility_online + "'  WHERE id= '" + batch_id +  "' " ;
    
    
    

    db.query(query, (err, result) => {

            
        if (err)
         {
            return res.status(500).json({errors:[{msg:err}]})
        }
        else{
            res.json({msg:`Batch Updated`});   
            }
});

});


router.delete('/:batch_id',auth,(req,res) => {

    

    let batch_id = req.params.batch_id;

    let query =  "DELETE FROM  `" + req.id + "_study_subs_master` WHERE id = '" + batch_id + "'" ;
    
    
    

    db.query(query, (err, result) => {

            
        if (err)
         {
            return res.status(500).json({errors:[{msg:err}]})
        }
        else{
            res.json({msg:`Batch Deleted`});   
            }
});

});






function create_table(id,res)
{
    let query = "CREATE TABLE " + id + "_study_subs_master LIKE study_subs_master;";
    query+="ALTER TABLE  `" + id + "_study_subs_master` ADD CONSTRAINT FK_VendorId_" + id + "  FOREIGN KEY (vendor_id) REFERENCES vendor_master(vendor_id) on delete cascade on update cascade;";

    db.query(query, (err, result) => {

            
        if (err) {
            console.log('Query Error');
            return res.json({errors:[{msg:err}]})
        }
        else{
            console.log('Table Created');
            res.send("Table CReated");
            
        }


    });

}

function send_data(id,res)
{
    let query = "SELECT * FROM " + id + "_study_subs_master";

    db.query(query, (err, result) => {

            
        if (err) {
            console.log('Query Error');
            //return res.json({errors:[{msg:'Query Error'}]})
        }
        else{
            res.json(result);
            
        }


    });


}



module.exports = router;