const { Schema, model, ObjectId } = require('mongoose')

const Order = new Schema({
  city: {type: String, required: true},
  phone: {type: String, required: true},
  email: {type: String, required: true},
  name: {type: String, required: true},
  address: {type: String, required: true},
  machineType: {type: String, required: true},
  description: {type: String, required: true},
  pay: {type: String, required: true},
  completed: {type: Boolean, default: false},
  user: {type: ObjectId},
  time: {type: String, required: true}
})

module.exports = model('Order', Order)