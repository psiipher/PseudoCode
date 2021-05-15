const express = require('express');
const router = express.Router();

//import JSrunner from "javascript-code-runner";
var JSrunner = require("javascript-code-runner")
// var platform;
// var id;
var result;
var code_sliced;
    
router.get('/',async(req,res) => {
    res.send(result);
});

router.post('/',async(req,res) => {
    code_sliced = req.body.code;
    code_sliced = code_sliced.slice(code_sliced.indexOf('>')+1,code_sliced.indexOf('</pre>'));
    console.log(code_sliced);
    code_sliced = code_sliced.replace(/&gt;/g, ">");
    code_sliced = code_sliced.replace(/console.log/g, "");
    result = JSrunner(code_sliced);
    res.json({msg:`Done!`});    
});


module.exports = router ;