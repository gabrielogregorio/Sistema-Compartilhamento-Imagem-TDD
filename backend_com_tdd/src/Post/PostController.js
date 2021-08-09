const express = require('express');
const Post = require('./Post');
const router = express.Router()
require('dotenv/config');
const userAuth = require('../middlewares/userAuth');
const jwtSecret = process.env.JWT_SECRET
const DataPosts = require('../factories/dataPosts');

router.post('/post', userAuth, async(req, res) => {
  let {title, body, user, test} = req.body;

  if (
    (title == '' || body == '' || user == '') ||
    (title == undefined || body == undefined || user == undefined)
    )
     {
      return res.sendStatus(400)
  }

  if (test == undefined) {
    test = false;
  }
  try {
    let newPost = new Post({title, body, user, test});
    await newPost.save();  
    res.json({sucess: true})
  } catch(error) {

    res.statusCode = 500;
    res.json({msg: "Usuário não registrado na base de dados!"})
  }
})

router.get('/posts', userAuth, async (req, res) => {
  var posts = await Post.find().populate('user').exec();

  var postFactories = []
  posts.forEach(post => {
    postFactories.push(DataPosts.Build(post))
  })

  res.statusCode = 200
  res.json(postFactories) 
})


router.get('/post/:id', userAuth, async (req, res) => {
  try {
    var posts = await Post.find({_id:req.params.id}).populate('user').exec();
  } catch(error) {
    return res.sendStatus(500)
  }

  if (posts.length == 0) {
    return res.sendStatus(404)
  }

  var postFactories = []
  posts.forEach(post => {
    postFactories.push(DataPosts.Build(post))
  })

  res.json(postFactories) 
})



module.exports = router;