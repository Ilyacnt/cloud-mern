const {Schema, model, ObjectId} = require('mongoose')

const Plan = new Schema({
    title: {type: String, required: true},
    diskSpace: {type: Number, default: 1024**3*3}
})

module.exports = model('Plan', Plan)