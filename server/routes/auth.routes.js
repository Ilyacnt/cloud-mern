const Router = require('express')
const router = new Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')
const authMiddleware = require('../middlewares/auth.middleware')
const fileService = require('../services/fileService')
const File = require('../models/File')

router.post('/registration', 
    [
        check('email', 'Некорректный E-mail').isEmail(),
        check('password', 'Пароль должен включать от 6 до 20 символов').isLength({min: 6, max: 20})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка валидации", errors})
            }

            const {email, password} = req.body

            const candidate = await User.findOne({email})
            if (candidate) {
                return res.status(400).json({message: 'Такой пользователь уже существует'})
            }

            const hashPassword = await bcrypt.hash(password, 4)
            const user = new User({email, password: hashPassword})

            await user.save()
            await fileService.createDir(new File({user: user.id, name: ''}))
            return res.json({message: 'Пользователь был создан'})

        } catch (error) {
            console.log(error)
            res.send({message: 'Что-то пошло не так'})
        }
})

router.post('/login', 
    async (req, res) => {
        try {
            const {email, password} = req.body
            const user = await User.findOne({email: email})

            if (!user) {
                return res.status(400).json({message: 'Такого пользователя не существует'})
            }

            const isPassValid = await bcrypt.compare(password, user.password)

            if (!isPassValid) {
                return res.status(400).json({message: 'Неверный пароль'})
            }

            const token = jwt.sign({id: user.id}, config.get('secretKey'), {expiresIn: config.get('tokenExpiresIn')})

            res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    diskSpace: user.diskSpace,
                    usedSpace: user.usedSpace,
                    avatarUrl: user.avatar
                }
            })

        } catch (error) {
            console.log(error)
            res.send({message: 'Что-то пошло не так'})
        }
})

router.get('/auth', authMiddleware,
    async (req, res) => {
        try {
            const user = await User.findOne({_id: req.user.id})
            
            const token = jwt.sign({id: user.id}, config.get('secretKey'), {expiresIn: config.get('tokenExpiresIn')})

            res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    diskSpace: user.diskSpace,
                    usedSpace: user.usedSpace,
                    avatarUrl: user.avatar
                }
            })

        } catch (error) {
            console.log(error)
            res.send({message: 'Что-то пошло не так'})
        }
})

module.exports = router