const {Router} = require('express')

const {registerUser, loginUser, getUser, changeAvatar, editUser, getAuthors} = require('../controllers/userControllers')
const authMiddleWare = require('../middleware/authMiddleware')


const router = Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/:id', getUser)
router.get('/', getAuthors)
router.post('/replace-avatar',authMiddleWare, changeAvatar)
router.patch('/edit-user', authMiddleWare ,editUser)


module.exports = router