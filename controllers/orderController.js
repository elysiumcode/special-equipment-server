const orderService = require('../services/orderService')

class OrderController {
    async create(req,  res) {
        try {
            if(!req.body) {
                return res.status(400).json({message: 'req error'})
            }
            console.log(req.user)
            const order = await orderService.create(req.body, req.user ? req.user.id : undefined)
            return res.json({message: 'order was created', order})
        }
        catch (e) {
            console.log(e)
            res.send({message: 'server error'})
        }
    }

    async delete(req,  res) {
        try {
            const {id} = req.params
            if(!id) {
                return res.status(400).json({message: 'id is undefined'})
            }

            const orders = orderService.delete(id)
            
            return res.json(orders)
        }
        catch (e) {
            console.log(e)
            res.send({message: 'server error'})
        }
    }

    async getUserOrders(req,  res) {
        try {
            const orders = await orderService.getOrders(req.user.id)
            return res.json(orders)
        }
        catch (e) {
            console.log(e)
            res.send({message: 'server error'})
        }
    }

    async getAllOrders(req,  res) {
        try {
            console.log(req.body)
            const orders = await orderService.getOrders()
            if(req.user.id) {
                return res.json(orders)
            }
            return res.status(401)
        }
        catch (e) {
            console.log(e)
            res.send({message: 'server error'})
        }
    }
    
    async getFilteredOrders(req,  res) {
        try {
            console.log(req.query)
            const orders = await orderService.getFilteredOrders(req.query)
            console.log(orders)
            if(req.user.id) {
                return res.json(orders)
            }
            return res.status(401)
        }
        catch (e) {
            console.log(e)
            res.send({message: 'server error'})
        }
    }
}

module.exports = new OrderController()