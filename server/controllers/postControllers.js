const Post = require("../models/postModel")
const User = require("../models/userModel")
const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");
const HttpError = require("../models/errorModel");


/// CREATE A POST
// POST: api/posts
// PROTECTED
const createPost = async (req, res, next)=>{
    try {
        let {title, category, description} = req.body
        if(!title || !category || !description || !req.files){
            return next(new HttpError("Fill in all fields, and choose thumbnail.", 422))
        }

        const {thumbnail} = req.files;

        //CHECK FILE SIZE
        if(thumbnail.size > 2000000){
            return next(new HttpError("File too large, should be less than 2mb."))
        }

        let fileName = thumbnail.name
        let splittedFilename = fileName.split('.');
        let newFilename = splittedFilename[0] + uuid() + '.' + splittedFilename[splittedFilename.length - 1]
        thumbnail.mv(path.join(__dirname, '..', '/uploads', newFilename), async (err)=>{
            if(err){
                return next(new HttpError(err))
            }else{
                const newPost = await Post.create({title, category, description, thumbnail: newFilename, creator: req.user.id})
                if(!newPost){
                    return next(new HttpError("Post couldn't be created", 422))
                }

                //FIND USER AND INCREASE POST COUNT BY 1
                const currentUser = await User.findById(req.user.id);
                const userPostCount = currentUser.posts + 1

                await User.findByIdAndUpdate(req.user.id, {posts: userPostCount})

                res.status(201).json(newPost)
            }


        })
    } catch (error) {
        return next(new HttpError(error))
    }
}

/// CREATE A POST
// GET: api/posts
// UNPROTECTED
const getPosts = async (req, res, next)=>{
    res.json('GET ALL Post')
}

/// CREATE A POST
// GET: api/posts/:id
// UNPROTECTED
const getPost = async (req, res, next)=>{
    res.json('Get single Post')
}

/// GET POST BY CATEGORY
// GET: api/posts/users/:id
// PROTECTED
const getUsersPost = async (req, res, next) => {
    res.json('Users post');
}


/// GET POST BY CATEGORY
// GET: api/posts/categories/:category
// PROTECTED
const getCatPost = async (req, res, next)=>{
    res.json('Get post by category')
}



/// CREATE A POST
// PATCH: api/posts/:id
// PROTECTED
const editPost = async (req, res, next)=>{
    res.json('Edit Post')
}

/// CREATE A POST
// DELETE: api/posts/:id
// PROTECTED
const deletePost = async (req, res, next)=>{
    res.json('Delete Post')
}


module.exports = {createPost, getPosts, getPost, getUsersPost, getCatPost, editPost, deletePost}