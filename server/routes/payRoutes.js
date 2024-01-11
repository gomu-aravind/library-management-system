const express=require('express')

const { isUser} = require('../utils/isAuth')
const { checkoutToCart, cartSuccess, checkoutToSubscribe, subscribeSuccess } = require('../controllers/payController')

const router=express.Router()

router.post('/cart',isUser,checkoutToCart)

router.post('/success-cart',isUser,cartSuccess)

router.post('/subscribe',isUser,checkoutToSubscribe)

router.get('/success-subscribe',isUser,subscribeSuccess)

module.exports=router
