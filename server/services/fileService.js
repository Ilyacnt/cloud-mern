const fs = require('fs')
const path = require('path')
const File = require('../models/File')

class FileService {

    createDir(file) {
        const filePath = path.resolve(__dirname, '../files') + path.sep + file.user + path.sep + file.path
        // console.log(filePath)
        // console.log(file.path)


        return new Promise((resolve, reject) => {
            try {
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath)
                    return resolve({message: 'Файл был создан'})
                } else {
                    return reject({message: 'Файл уже существует'})
                }
            } catch (error) {
                return reject({message: 'Ошибка при создании файла на сервере' + error})
            }
        })
    }


    deleteFile(file) {
        const filePath = this.getPath(file)
        if (file.type === 'dir') {
            fs.rmdirSync(filePath)
        } else {
            fs.unlinkSync(filePath)
        }
    }


    getPath(file) {
        return path.resolve(__dirname, '../files') + path.sep + file.user + path.sep + file.path
    }
}

module.exports = new FileService()