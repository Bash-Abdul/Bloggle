const {Router} = require('express')

const {createPost, getPosts, getPost,getUsersPost,getCatPost,editPost, deletePost} = require('../controllers/postControllers')
const authMiddleWare = require('../middleware/authMiddleware')

const router = Router()

router.post('/', authMiddleWare ,createPost)
router.get('/', getPosts)
router.get('/:id', getPost)
router.get('/user/fghd', getUsersPost)
router.get('/:categories/:category', getCatPost)
router.patch('/:id', authMiddleWare ,editPost)
router.delete('/:id', authMiddleWare,deletePost)

module.exports = router