const {Router} = require('express')

const {createPost, getPosts, getPost,getUserPosts,getCatPost,editPost, deletePost} = require('../controllers/postControllers')
const authMiddleWare = require('../middleware/authMiddleware')

const router = Router()

router.post('/', authMiddleWare ,createPost)
router.get('/', getPosts)
router.get('/:id', getPost)
router.get('/user-post/:id', getUserPosts);
router.patch('/:id', authMiddleWare ,editPost)
router.delete('/:id', authMiddleWare,deletePost)
router.get('/:categories/:category', getCatPost)


module.exports = router