const express = require('express');
const router = express.Router();

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('c320b4be0c3b4d029f305f96e7d6b1a3');


router.get('/',async(req,res) => {
    newsapi.v2.topHeadlines({
        //q: 'trump',
        category: 'technology',
        language: 'en',
        country: 'in'
      }).then(response => {
        
        res.send(JSON.stringify(response));
      });
});

router.post('/user_profile',async(req,res) => {
    handle_name = req.body.handle_name;
    res.json({msg:`Done!`});    
});

module.exports = router ;