const { Schema, model } = require('mongoose')

const User = new Schema({
    phone: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, default: 'client'},
    type: {type: String, default: 'individual'},
    firstName: {type: String, required: true},
    middleName: {type: String, required: true},
    lastName: {type: String, required: true},

})

module.exports = model('User', User)