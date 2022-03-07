const { Schema, model, ObjectId } = require('mongoose')

const Order = new Schema({
  phone: {type: String, required: true},
  email: {type: String, required: true},
  name: {type: String, required: true},
  address: {type: String, required: true},
  description: {type: String, required: true},
  pay: {type: String, required: true},
  time: {type: String, required: true},
  completed: {type: Boolean, default: false},
  user: {type: ObjectId, required: true}
})

module.exports = model('Order', Order)