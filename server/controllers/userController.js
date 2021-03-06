const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')
const User = require('../models/User')
const File = require('../models/File')
const Plan = require('../models/Plan')
const fileService = require('../services/fileService')
const userService = require('../services/userService')



class UserController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка валидации", errors})
            }
            const {email, firstName, lastName, password, planTitle} = req.body
            const candidate = await User.findOne({email})
            if (candidate) {
                return res.status(400).json({message: 'Такой пользователь уже существует'})
            }
        
            const plan = new Plan({title: planTitle, diskSpace: (planTitle === 'Basic' ? 1024**3*3 : 1024**3*10)})
            await plan.save()
            const hashPassword = await bcrypt.hash(password, 4)
            const user = new User({email, firstName, lastName, password: hashPassword, plan})
            await user.save()
            const token = userService.generateUserToken(user)
            await fileService.createDir(new File({user: user.id, name: ''}))
            return res.json({message: 'Пользователь был создан', user, plan, token}).status(201)
        } catch (error) {
            console.log(error)
            res.send({message: 'Что-то пошло не так'}).status(500)
        }
    }

    async login(req, res) {
        try {
            const {email, password} = req.body
            const user = await User.findOne({email: email})
            if (!user) {
                return res.status(400).json({message: 'Такого пользователя не существует'})
            }
            const plan = await Plan.findById(user.plan)
            const isPassValid = await bcrypt.compare(password, user.password)
            if (!isPassValid) {
                return res.status(400).json({message: 'Неверный пароль'})
            }
            const token = userService.generateUserToken(user)
            res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    diskSpace: plan.diskSpace,
                    usedSpace: user.usedSpace,
                    planTitle: plan.title,
                    avatarUrl: user.avatar
                }
            })
        } catch (error) {
            console.log(error)
            res.send({message: 'Что-то пошло не так'})
        }
    }

    async auth(req, res) {
        try {
            const user = await User.findOne({_id: req.user.id})
            const plan = await Plan.findById(user.plan)
            const token = userService.generateUserToken(user)
            res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    diskSpace: plan.diskSpace,
                    usedSpace: user.usedSpace,
                    planTitle: plan.title,
                    avatarUrl: user.avatar
                }
            })
        } catch (error) {
            console.log(error)
            res.send({message: 'Что-то пошло не так'})
        }
    }
}

module.exports = new UserController()