const express = require('express');
const router = express.Router();

var cf = require('cf-api-wrapper');

router.get('/codeforces',async(req,res) => {
    cf.user.info({handles: 'tourist'}).then(
        result => {
            console.log(JSON.stringify(result));
            res.send(JSON.stringify(result));
        },
        err => {
            console.log(err);
        }
    )
});

router.post('/codeforces',async(req,res) => {
    platform = req.body.platform;
    id = req.body.id;
    res.json({msg:`Done!`});    
});


module.exports = router ;