const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const corsMiddleware = require('./middleware/cors.middleware');
const authRouter = require('./routes/auth.routes')
const orderRouter = require('./routes/order.routes')

const PORT = process.env.PORT || 5000

const app = express();

app.use(corsMiddleware)
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/order', orderRouter)

async function start() {
  try {
    await mongoose.connect(
      'mongodb+srv://Mrmimka:Falcon1000@cluster0.rxlso.mongodb.net/orders',
      {
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        //serverApi: ServerApiVersion.v1
      }
    )
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()