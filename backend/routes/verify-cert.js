const express = require('express');
const router = express.Router();

var cert= require('verify-certification');
var platform;
var id;


//W54XDBFBYXU2
router.get('/',async(req,res) => {
    cert.verify(platform, id).then(
        result => {
                //console.log(JSON.stringify(result));
                res.send(JSON.stringify(result));
            },
        err => {
                console.log(err);
             })
});

router.post('/',async(req,res) => {
    platform = req.body.platform;
    id = req.body.id;
    res.json({msg:`Done!`});    
});


module.exports = router ;