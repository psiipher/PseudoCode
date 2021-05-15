const express = require('express');
const router = express.Router();

var cf = require('cf-api-wrapper');
var handle_name;
var tag;


//USER PROFILE
router.get('/user_profile',async(req,res) => {
    cf.user.info({handles: handle_name}).then(
        result => {
            console.log(JSON.stringify(result));
            res.send(JSON.stringify(result));
        },
        err => {
            console.log(err);
        }
    )
});

router.post('/user_profile',async(req,res) => {
    handle_name = req.body.handle_name;
    res.json({msg:`Done!`});    
});


//PROBLEMS

router.get('/problems',async(req,res) => {
    cf.problemset.problems({tags: tag}).then(
        result => {
            //console.log(JSON.stringify(result));
            res.send(JSON.stringify(result));
        },
        err => {
            console.log(err);
        }
    )
});

router.post('/problems',async(req,res) => {
    tag = req.body.name;
    console.log(req.body);
    res.json({msg:`Done!`});    
});

module.exports = router ;