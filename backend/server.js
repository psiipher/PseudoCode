const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
app.use(cors());
const session = require('express-session');
const flash = require('req-flash');
const path = require('path');
const multer = require('multer');


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "webtoken,Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


  // function getDateString() {
  //   const date = new Date();
  //   const year = date.getFullYear();
  //   const hour = date.getHours();
  //   const minute = date.getMinutes();
  //   const month = `${date.getMonth() + 1}`.padStart(2, '0');
  //   const day =`${date.getDate()}`.padStart(2, '0');
  //   return `${day}_${month}_${year} ${hour}_${minute}`
  // }
  

  // const storage = multer.diskStorage({
  //   destination: (req, file, callBack) => {
  //       callBack(null, 'uploads')
  //   },
  //   filename: (req, file, callBack) => {
  //       callBack(null, `${getDateString()}_${file.originalname}`)
  //   }
  // });

  // const upload = multer({ storage: storage });
  

const port = 5000;

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pseudocode',
    multipleStatements: true,
    insecureAuth:true,
    port:3306
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
       
    }
    console.log('Connected to database');
});
global.db = db;





//Init middleware 
app.use(bodyParser.json()); 




// routes for the app

app.use('/api',require('./routes/auth'));
app.use('/api/verify-cert',require('./routes/verify-cert'));
app.use('/api/code',require('./routes/code'));
// app.use('/api/dashboard',require('./routes/dashboard'));
// app.use('/api/dashboard/batch',require('./routes/batch_master'));
// app.use('/api/dashboard/locker_batch',require('./routes/locker_master'));
// app.use('/api/admin/edu',require('./routes/education_master'));
// app.use('/api/admin/exam',require('./routes/exam_master'));
// app.use('/api/admin/duration',require('./routes/duration_master'));

//app.use('/api/student',require('./routes/student_registration'));





// app.post('/api/dashboard/sub4', upload.array('files'), (req, res, next) => {
//     const file = req.files;
//     console.log(file);
//     if (!file) {
//       const error = new Error('No File')
//       error.httpStatusCode = 400
//       return next(error)
//     }
//       res.send(file);
//   })








// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
