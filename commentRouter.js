const DataNav = require('./data/db.js')
const express = require('express')
const router = express.Router()





  router.get('/', (req,res)=>{

      DataNav.find(req.query)
        .then(posts=>{

          res.status(200).json(posts)
        })
        .catch(err=>{
          res.status(500).json({
            message:"err"
          })
        })
  })   



  router.post('/:id/comments', (req,res)=>{//post to chosen comment
      DataNav.findById(parseInt(req.params.id))
      .then(id_=>{
        if(id.id){//if id exist


            if(!req.body.text){//if there isnt text to post 
                res.status(400).json({
                  errorMessage: "Please provide text for the comment."
                })
            }else{//if theres text to post
                DataNav.update(parseInt(req.params.id),req.body)
                .then(com_=>{
                  res.status(201).json({created:req.body})
                })
                .catch(err=>{
                  res.status(500).json({error: "There was an error while saving the comment to the database"})
                })
            }





        }else{//if id doesnt exist  
          res.status(404).json({
            message: "The post with the specified ID does not exist."
          })
        }
      })
  })



  module.exports = router
