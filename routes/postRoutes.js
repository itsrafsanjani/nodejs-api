const express = require('express')
const router = express.Router()
const Post = require('../models/Post')

// get all post
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find()
        res.json(posts)
    } catch (err) {
        res.status(404).json(err)
    }
})

// create post
router.post('/', async (req, res) => {
    const post = new Post(req.body)
    try {
        const savePost = await post.save()
        res.json(savePost)
    } catch(err){
        res.status(404).json(err)
    }
})

// get a specific post by id
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const post = await Post.findById(id)
        res.json(post)
    } catch (err) {
        res.status(404).json(err)
    }
})

// delete a specific post by id
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const removedPost = await Post.findByIdAndDelete(id)
        res.status(200).json(removedPost)
    } catch (err) {
        res.status(404).json(err)
    }
})

// update a post
router.patch('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updatedPost = await Post.findByIdAndUpdate(id, req.body)
        res.status(200).json(updatedPost)
    } catch (err) {
        res.status(404).json(err)
    }
})


module.exports = router