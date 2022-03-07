const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Order = require('../models/Order')
const User = require('../models/User')
const config = require('config')


class orderService {
    async create(obj, id) {
        const orderObj = {
            ...obj,
            completed: false,
            user: id
        }
        const order = new Order(orderObj)
        await order.save()

        return orderObj
    }

    async delete(id) {
        await Order.findOneAndDelete({id})
        return (await Order.find()).filter(order => order.id !== id)
    }

    async getOrders(id) {
        if(!id) return Order.find()
        return await Order.find({user: id})
    }
}

module.exports =  new orderService()