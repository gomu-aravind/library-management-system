const express=require('express')
const { isAdmin, isAuthorized } = require('../utils/isAuth')
const { addBook, deleteBook, updateBook, getAllBooks, getSpecificGenreBooks, getSpecificBooks } = require('../controllers/bookController')

const router=express.Router()

router.get('/allbook',isAuthorized,getAllBooks)

router.get('/genre',isAuthorized,getSpecificGenreBooks)

router.get('/:id',getSpecificBooks)

router.post('/add',isAdmin,addBook)

router.put('/update/:bookId',isAdmin,updateBook)

router.delete('/delete/:bookId',isAdmin,deleteBook)


module.exports=router