const DataNav = require('./data/db.js')
const express = require('express')
const router = express.Router()




router.get('/', (req, res) => {//get post.. again i guess...throwing this at the top
  DataNav.find(res.query)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The posts information could not be retrieved.' })
    })
})
 




  router.post('/', (req,res)=>{
    const post_ = req.body

      if(post_.title || post_.contents){
         DataNav.insert(post_)
        .then(posts=>{
          
          res.status(201).json({created:post_})
        })
        .catch(err=>{
          res.status(500).json({
             error: "There was an error while saving the post to the database"
          })
        })
      }else{
        res.status(400).json({errorMessage: "Please provide title and contents for the post." })
      }
     
  })   





  router.post('/:id/comments', (req,res)=>{// give comment to a chosen post
          const id_ = req.params.id
              DataNav.findCommentById(id_)
              .then(comments=>{
                  if(!comments.post_id){
                    res.status(404).json({
                       message: "The post with the specified ID does not exist." 
                    })
                  }else{
                    if(!req.body.text){
                    res.status(400).json({
                       errorMessage: "Please provide text for the comment." 
                    })
                    }else{

                        DataNav.insertComment(req.body)
                        .then(done=>{
                          res.status(201).json({created:req.body})
                        })
                        .catch(err=>{
                          res.status(500).json({
                            error: "There was an error while saving the comment to the database" 

                          })
                        })
                    }
                  }
              })
             
  })



router.get('/:id', (req, res) => {//get a chosen post
  const id_ = req.params.id

  if (!id_) {
    res.status(404).json({
     message: 'The post with the specified ID does not exist.' })
  } else {
    DataNav.findById(id_)
      .then(posts => {
        res.status(200).json(posts)
      })
      .catch(err => {
        res.status(500).json({ 
          error: 'The post information could not be retrieved.' })
      })
  }
})



router.get('/:id/comments', (req, res) => {//get comments to a chosen post
  const id_ = req.params.id

  if (!id_) {
    res.status(404).json({ 
      message: 'The comment with the specified ID does not exist.' })
  } else {
    DataNav.findCommentById(id_)
      .then(comment => {
        res.status(200).json(comment)
      })
      .catch(err => {
        res.status(500).json({ 
          error: 'The comments information could not be retrieved.' })
      })
  }
})




router.delete('/:id', (req, res) => {//remove post fr....i think
  const id_ = req.params.id

  if (!id_) {
    res.status(404).json({
     message: 'The post with the specified ID does not exist.' })
  } else {
    DataNav.remove(id_)
      .then(() => {
        res.status(200).json({ 
          message: 'The post was deleted.' })
      })
      .catch(err => {
        res.status(500).json({ 
          error: 'The post could not be removed.' })
      })
  }
})





  router.put('/:id', (req, res) => {//error and cant figure it out(remember to ask elijah)
  const id_ = req.params.id
  const newPost = req.body

        DataNav.findById(id_).then(
          post=>{

            if (!newPost.title || !newPost.contents) {
    res.status(400).json({
     errorMessage: 'Please provide title and contents for the post.' })
  } else {
     DataNav.update(post.id,newPost)
      .then(posts => {
        res.status(200).json({OK:newPost})
      })
      .catch(err => {
        res.status(500).json({ 
          error: 'The post information could not be modified.' })
      })
  }
           
          }
    
          ).catch(err=>res.status(404).json({ 
            message: 'The post with the specified ID does not exist.' }))


  
})







  module.exports = router