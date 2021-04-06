const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');



router.get('/',auth,(req,res)=>{

    let table_query = "SELECT * FROM information_schema.tables WHERE table_schema = 'peer_tag' AND table_name ='" + req.id + "_locker_master'  LIMIT 1 ";

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

    let {batchname,batch_desc,plan_type,fees,duration,visibility_erp,visibility_online} = req.body;

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

    let query =  "INSERT INTO `" + req.id + "_study_subs_master` (`id`, `vendor_id`, `batch_name`, `batch_description`, `plan_type`, `fees`,`duration`,`visibility_erp`,`visibility_online`,`batch_nature`) VALUES (NULL,'"+ req.id + "','"+ batchname + "', '"+ batch_desc + "', '"+ plan_type + "', '"+ fees + "','"+ duration + "','"+ visibility_erp + "','"+ visibility_online + "',1)" ;
    
    
    

    db.query(query, (err, result) => {

            
        if (err) {
            return res.status(500).json({errors:[{msg:err}]})
        }
        else{
            res.json({msg:`Locker_Batch Added`});

        
    

            }
});

});

/*router.post('/auto',auth,(req,res) => {

    let {no_of_lockers} = req.body;

    var j;
    let query =  " " ;
    if(no_of_lockers > 0)
    {
        for(var i=0;i<no_of_lockers;i++)
        {
             j = i+1;
            query+="INSERT INTO `" + req.id + "_locker_master` (`id`,`locker_number`,`status`,`visibility_erp`,`visibility_online`) VALUES (NULL,'" + j + "',0,1,1);";

    
        }

        db.query(query, (err, result) => {

            
            if (err) {
                return res.status(500).json({errors:[{msg:err}]})
            }
            else{
                res.json({msg:`Lockers Added Automatically`});
    
            
        
    
                }
    });

    }
    else
    {
        res.status(400).send('Response Error');
    }

});*/

router.post('/add',auth,(req,res) => {

    let {no_of_lockers} = req.body;

    let query1 = "SELECT * FROM `" + req.id + "_locker_master` WHERE id=(SELECT max(id) FROM `" + req.id + "_locker_master`)";

    db.query(query1, (err, result) => {

            
        if (err) {
            return res.status(500).json({errors:[{msg:err}]})
        }
        else
        {
            if(result[0] != null)
            {
                var last_num=result[0].locker_number;
                console.log(last_num);
            }
            else
            {
                last_num=0;
            }

                var j;
                let query =  "Select * from `" + req.id + "_locker_master` ; " ;
                if(no_of_lockers > 0)
                {
                    for(var i=0;i<no_of_lockers;i++)
                    {
                        j = i+last_num+1;
                        query+="INSERT INTO `" + req.id + "_locker_master` (`id`,`locker_number`,`status`,`visibility_erp`,`visibility_online`) VALUES (NULL,'" + j + "','Available',1,1);";

                
                    }

                    db.query(query, (err, result) => {

                        
                        if (err) {
                            return res.status(500).json({errors:[{msg:err}]})
                        }
                        else{
                            console.log(result);
                            res.json({msg:`Lockers Added Automatically`});
                
                        
                    
                
                            }
                });

                }
                else
                {
                    res.status(400).send('Response Error');
                }
           

        
    

            }
    });

    

});


router.post('/edit/:locker_id',auth,(req,res) => {

    let {status,visibility_erp_master,visibility_online_master} = req.body;
    if (visibility_erp_master == true) {
        visibility_erp_master = 1;
    }
    else{
        visibility_erp_master = 0;
    }

    if (visibility_online_master == true) {
        visibility_online_master = 1;
    }
    else{
        visibility_online_master = 0;
    }

    let locker_id = req.params.locker_id;

    let query =  "UPDATE  `" + req.id + "_locker_master` SET status='" + status + "',visibility_erp='" + visibility_erp_master + "',visibility_online='" + visibility_online_master +  "'  WHERE id= '" + locker_id +  "' " ;
    
    
    

    db.query(query, (err, result) => {

            
        if (err)
         {
            return res.status(500).json({errors:[{msg:err}]})
        }
        else{
            res.json({msg:`locker_Batch Updated`});   
            }
});

});


router.post('/:batch_id',auth,(req,res) => {

    let {batchname,batch_desc,plan_type,fees,duration,visibility_erp,visibility_online} = req.body;

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

    let query =  "UPDATE  `" + req.id + "_study_subs_master` SET batch_name='" + batchname + "',batch_description='" + batch_desc + "',plan_type='" + plan_type + "',fees='" + fees + "',duration='" + duration + "',visibility_erp='" + visibility_erp + "',visibility_online='" + visibility_online + "'  WHERE id= '" + batch_id +  "' " ;
    
    
    

    db.query(query, (err, result) => {

            
        if (err)
         {
            return res.status(500).json({errors:[{msg:err}]})
        }
        else{
            res.json({msg:`locker_Batch Updated`});   
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
    let query = "CREATE TABLE " + id +"_locker_master LIKE locker_master;";
    /*query+="ALTER TABLE  `" + id + "_study_subs_master` ADD CONSTRAINT FK_VendorId_" + id + "  FOREIGN KEY (vendor_id) REFERENCES vendor_master(vendor_id) on delete cascade on update cascade;";*/

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
    let query = "SELECT * FROM " + id + "_study_subs_master where batch_nature = 1;";
    query+= "SELECT * FROM " + id + "_locker_master;"

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