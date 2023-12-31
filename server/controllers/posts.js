import mongoose from "mongoose"
import PostMessage from "../models/postMessage.js"

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find()
        res.status(200).json(postMessages)
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
}

export const createPost = async (req, res) => {
    const body = req.body
    const newPost = new PostMessage(body)
    try {
        await newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        console.log(error)
        res.status(409).json({ message: error.message })
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params

    const post = req.body
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that id")

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true })
    res.status(200).json(updatedPost)

}

export const deletePost = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that id")

        await PostMessage.findByIdAndRemove(id)
        res.json({ message: "Post deleted successfully" })

    } catch (error) {
        console.log(error)
    }
}

export const likePost = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('no post found with that id')

        const post = await PostMessage.findById(id)
        const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true })
        res.json(updatedPost)

    } catch (error) {
        console.log(error)
    }

}