const Router = require('express')
const router = new Router()
const {check} = require('express-validator')
const authMiddleware = require('../middlewares/auth.middleware')
const userController = require('../controllers/userController')


router.post('/registration', 
    [
        check('email', 'Некорректный E-mail').isEmail(),
        check('password', 'Пароль должен включать от 6 до 20 символов').isLength({min: 6, max: 20})
    ],
    userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.auth)


module.exports = router