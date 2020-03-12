const express = require('express')
	
const DataNav = require('./data/db.js')

const PostModz = require('./postRouter.js');
// const CommentModz = require('./commentRouter.js');


	

	const server = express()

	server.use(express.json())

	server.get('/', (req,res)=>{
		res.status(200).send(`
			<h1>Yoooooo!!!!</h1>

			`)
	})


	server.use('/api/posts', PostModz)
	// server.use('/api/comments', CommentModz)



	module.exports = server;