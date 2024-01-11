const express=require('express')
const { isAdmin } = require('../utils/isAuth')
const { getSubscribedUser, getUserFines } = require('../controllers/authController')


const router=express.Router()

router.get('/subscribed-user',isAdmin,getSubscribedUser)

router.get('/pending-fines',isAdmin,getUserFines)

module.exports=router