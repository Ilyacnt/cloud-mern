const fs = require('fs')
const path = require('path')
const uuid = require('uuid')
const User = require('../models/User')
const File = require('../models/File')
const fileService = require('../services/fileService')
const Plan = require('../models/Plan')


class FileController {
    async createDir(req, res) {
        try {
            const {name, type, parent} = req.body
            const file = new File({name, type, parent, user: req.user.id})
            const parentFile = await File.findById(parent)
            if(!parentFile) {
                file.path = name
                await fileService.createDir(file)
            } else {
                file.path = parentFile.path + path.sep + file.name
                await fileService.createDir(file)
                parentFile.childs.push(file._id)
                await parentFile.save()
            }
            await file.save()
            return res.json(file)
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    }

    async getFiles(req, res) {
        try {
            const files = await File.find({user: req.user.id, parent: req.query.parent})
            return res.json(files)
        } catch (error) {
            console.log(error)
            res.status(500).json({message: 'Ошибка при получении файлов на сервере'})
        }
    }

    async uploadFile(req, res) {
        try {
            const file = req.files.file
            const parent = await File.findOne({user: req.user.id, _id: req.body.parent})
            const user = await User.findById(req.user.id)
            const plan = await Plan.findById(user.plan)
            if (user.usedSpace + file.size > plan.diskSpace) {
                return res.status(507).json({message: 'Недостаточно места на диске'})
            }
            let filePath
            if (parent) {
                filePath = path.resolve(__dirname, '../files') + path.sep + user._id + path.sep + parent.path + path.sep + file.name
            } else {
                filePath = path.resolve(__dirname, '../files') + path.sep + user._id + path.sep + file.name
            }
            if (fs.existsSync(filePath)) {
                return res.status(500).json({ message: 'Такой файл уже существует на диске'})
            }
            file.mv(filePath)
            const type = file.name.split('.').pop()
            let pathForDbFile = file.name
            if (parent) {
                pathForDbFile = parent.path + path.sep + file.name
            }
            const dbFile = new File({
                name: file.name,
                type,
                size: file.size,
                path: pathForDbFile,
                parent: parent?._id,
                user: user._id
            })
            await dbFile.save()
            

            user.usedSpace = user.usedSpace + file.size
            await user.save()
            return res.json(dbFile)
        } catch (error) {
            console.log(error)
            res.status(500).json({message: 'Ошибка при загрузке файла на сервер'})
        }
    }

    async downloadFile(req, res) {
        try {
            const file = await File.findOne({_id: req.query.id, user: req.user.id})
            const filePath = path.resolve(__dirname, '../files') + path.sep + req.user.id + path.sep + file.path // + path.sep + file.name
            if (fs.existsSync(filePath)) {
                return res.download(filePath, file.name)
            }
            return res.status(404).json({message: 'Файл не найден на сервере'})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: 'Ошибка при загрузке файла с сервера'})
        }
    }

    async deleteFile(req, res) {
        try {
            const file = await File.findOne({_id: req.query.id, user: req.user.id})
            const user = await User.findById(req.user.id)
            user.usedSpace = user.usedSpace - file.size
            if (!file) {
                return res.status(404).json({message: 'Файл не найден на сервере'})
            }
            fileService.deleteFile(file)
            await user.save()
            await file.remove()
            return res.json({message: 'Файл успешно удален'})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: 'Ошибка при удалении файла с сервера, папка не пуста'})
        }
    }

    async uploadAvatar(req, res) {
        try {
            const file = req.files.file
            // Сюда нужно прикрутить валидацию файла, так как пользователь может отправить файл не того формата
            const user = await User.findById(req.user.id)
            const avatarName = uuid.v4() + '.jpg'
            file.mv(fileService.getStaticPath(avatarName))
            user.avatar = avatarName
            await user.save()
            return res.json({message: 'Аватар был успешно загружен', user})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: 'Ошибка при добавлении аватара'})
        }
    }

    async deleteAvatar(req, res) {
        try {
            const user = await User.findById(req.user.id)
            fs.unlinkSync(fileService.getStaticPath(user.avatar))
            user.avatar = null
            await user.save()
            return res.json({message: 'Аватар был успешно удален', user})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: 'Ошибка при удалении аватара'})
        }
    }
}


module.exports = new FileController()
