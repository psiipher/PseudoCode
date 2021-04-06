const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req,res,next) => {

    const token = req.header('Authorization');

    if(!token)
    {
        return res.status(401).send('unauthorized access');
    }

    const decoded_header = jwt.verify(token,config.get('jwtSecret'));
    req.id = decoded_header.vendor_profile.id;
    

    let query =  "SELECT jwt_token from vendor_master where vendor_id='"+req.id+"'";

    db.query(query, (err, result) => {

            
        if (err) {
            return res.status(500).json({errors:[{msg:'Query Error'}]})
        }
        else{


            try{
                const decoded_data = jwt.verify(result[0].jwt_token,config.get('jwtSecret'));

                if(decoded_header.vendor_profile.id === decoded_data.vendor_profile.id)
                {
                    console.log('Auth sucessfull');
                    next();
                }
                else
                {
                   // console.log(`header token-${token}`);
                   // console.log(`database-${result[0].jwt_token}`);
                  // console.log(`decoded_data-${decoded_data}`);
                  // console.log(`decoded_header-${decoded_header}`);
                 // decoded_header.vendor_profile.add1 === decoded_header.vendor_profile.add1
                  console.log('Match Error');


                }
                

                
               


            }catch(err)
            {
                if(err)
                {
                    res.json({msg:err.message});
                    res.status(401).json({msg:'token not valid'});
                }
            }
        }
    })

   

    

};