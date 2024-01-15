const express=require('express')
const { registerUser, login, logout,  borrowBook, getPlan, bookBorrowed, getCoupons, returnBook, getFine, useCoupons, payFine, getOrder } = require('../controllers/userController')
const { isUser, isAuthorized} = require('../utils/isAuth')

const router=express.Router()

router.post('/register',registerUser)

router.post('/login',login)

router.post('/logout',isAuthorized,logout)

router.post('/borrow',isUser,borrowBook)

router.get('/borrowed-book',isUser,bookBorrowed)

router.get('/coupons',isUser,getCoupons)

router.post('/use-coupons',isUser,useCoupons)

router.put('/return/:bookId',isUser,returnBook)

router.get('/fine',isUser,getFine)

router.put('/fine',isUser,payFine)

router.get('/plan',isUser,getPlan)

router.get('/order',isUser,getOrder)

module.exports=router