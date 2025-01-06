const {Router} = require('express')

const {createPost, getPosts, getPost,getUsersPost,getCatPost,editPost, deletePost, postUserGet} = require('../controllers/postControllers')
const authMiddleWare = require('../middleware/authMiddleware')

const router = Router()

router.post('/', authMiddleWare ,createPost)
router.get('/', getPosts)
router.get('/:id', getPost)
router.patch('/:id', authMiddleWare ,editPost)
router.delete('/:id', authMiddleWare,deletePost)
router.get('/post/users/:fgdg', postUserGet)
router.get('/:categories/:category', getCatPost)
router.get('/authors/:id', getUsersPost)

module.exports = router