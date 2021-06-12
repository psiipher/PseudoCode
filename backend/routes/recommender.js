const express = require('express');
const router = express.Router();
const {PythonShell} = require('python-shell');

var title;

//Router to handle the incoming request.
router.get("/", (req, res, next)=>{
	//Here are the option object in which arguments can be passed for the python_test.js.
	let options = {
		mode: 'text',
		pythonOptions: ['-u'], // get print results in real-time
		scriptPath: '/home/zero/College/BE Project/PseudoCode_CoreUI/src/assets', //If you are having python_test.py script in same folder, then it's optional.
		args: [title] //An argument which can be accessed in the script using sys.argv[1]
	};
	

	PythonShell.run('recommender.py', options, function (err, result){
		if (err) {
			console.log("No recommendations found!");
		}
		// result is an array consisting of messages collected
		//during execution of script.
		res.send(JSON.stringify(result))
	});
});


//W54XDBFBYXU2
// router.get('/',async(req,res) => {

// });

router.post('/',async(req,res) => {
    title = req.body.title;
    res.json({msg:`Done!`});    
});


module.exports = router ;