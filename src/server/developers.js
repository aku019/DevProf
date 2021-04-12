const express = require('express');
const fetch = require('node-fetch');
const axios = require('axios');

const router = express.Router();
const { devRepos } = require('./developers_data');
const DEV = require('../models/developer_data');

/* GET /api/developers */

router.get('/', (req, res) => {
    const devList = [];
    // Object.keys(devRepos).forEach((id) => {
    //     const user = {
    //         id:id,
    //         avatar_url: devRepos[id].avatarUrl,
    //     };
    //     usersData.push(user);
    // });

    DEV.find(  ).then(dev => {
        console.log(dev);

    

    dev.forEach(function (item) {
        devList.push({id:item.id, avatar_url:item.avatar_url});
    });
    res.status(200).send(devList);
});
       
    //res.status(200).send(usersData);
});

/* POST /api/developers */
						
						
router.post('/', async(req, res) => {

    if(!req.body.github_id) {
        res.status(400).json({ error: 'Github_id is required' });
    }
    const github_id= req.body.github_id;
    const linkedin_id= req.body.linkedin_id;
    const codechef_id= req.body.codechef_id;
    const hackerrank_id= req.body.hackerrank_id;
    const twitter_id= req.body.twitter_id;
    const medium_id= req.body.medium_id;

    console.log(req);
    
    const id=github_id;
    axios(`https://api.github.com/users/${id}`)
   .then(
       response=> { 
//console.log(response.data);
           user = {
           ...response.data, 
        //    ...user
           
       
    }
    const avatar_url=user.avatar_url;
    const name = user.name;
    const company = user.company;
    const blog=user.blog;
    const location= user.location;
    const email= user.email;
    const bio= user.bio;
    const url=user.repos_url;
   // const repos;
   axios(url)
   .then(
       resp=> { 
//console.log(response.data);
           user2 = {
           ...resp.data, 
        //    ...user
           
       
    }
    const repos=[];
    Object.keys(user2).forEach(id =>{
        console.log(user2[id].name);
        if(user2[id]!== "undefined")
        repos.push({name:user2[id].name,html_url:user2[id].html_url,description:user2[id].description,updated_at:user2[id].updated_at}); //.user.avatar_url
    })
    const dev =  new DEV({id,avatar_url,name,company,blog,location,email,bio,github_id,linkedin_id,codechef_id,hackerrank_id,twitter_id,medium_id,repos});
    console.log(dev);
            try
            { 
               // console.log("woohoo");
             //  const x= await dev.save();
             const x=  dev.save();

               res.status(201).send({id});
            }
            catch{
                console.log("loop");
                res.status(400).send("F");

            }
    
//users[id]={id,avatar_url,name,company,blog,location,email,bio,github_id,linkedin_id,codechef_id,hackerrank_id,twitter_id,medium_id,repos};
   // console.log(users[id]);
 //   res.status(201).send({id});
});
});
});

/* GET /api/developers/:id */

router.get('/:id', (req, res) => {
    // Object.keys(devRepos).forEach((element) => {
    //     /* console.log(`github id ${element.github_id}    request param ${req.params.id}`); */
    //     if (element.github_id === req.params.id) {
    //         /* console.log('Hi there'); */
    //         res.status(200).send((element));
    //     }
    // });

    // res.status(404).send('User does not exist');

    const {id}  = req.params;
    const {id2}  = req.params.id;
    //const long_url = urls[req.params.id];
    console.log(id);
     console.log(id2);
    var found=0;
    DEV.findOne( {id:id} ).then(dev => {
        console.log(dev);
        if (dev !=null) {
            found=1;
            console.log(dev);
            res.status(200).send((dev))
           return;
               
        }
        else
        res.status(404).send('User does not exist');

    });
});



router.get('/search/:id', (req, res) => {
    // Object.keys(devRepos).forEach((element) => {
    //     /* console.log(`github id ${element.github_id}    request param ${req.params.id}`); */
    //     if (element.github_id === req.params.id) {
    //         /* console.log('Hi there'); */
    //         res.status(200).send((element));
    //     }
    // });

    // res.status(404).send('User does not exist');

    const {id}  = req.params;
    const {id2}  = req.params.id;
    //const long_url = urls[req.params.id];
    console.log(id);
     console.log(id2);
    var found=0;
    DEV.findOne( {id:id} ).then(dev => {
        console.log(dev);
        if (dev !=null) {
            found=1;
            console.log(dev);
            const developer = [
                {
                    id:dev.id,
                    avatar_url:dev.avatar_url,
                }
            ];
            res.status(200).json(developer);
           return;
               
        }
        else
        res.status(500).send('User does not exist');

    });
});














/* DELETE /api/developers/:id */

router.delete('/:id', (req, res) => {
    let i = 0;
    while (i < devRepos.length) {
        const user = devRepos[i];
        if (user.id === req.params.id) {
            devRepos.splice(i, 1);
            res.status(204).send('Deleted');
        }
        i += 1;
    }
    res.status(404).send('User does not exist');
});

module.exports = router;
