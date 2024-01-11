const cloudinary=require('../utils/cloudinary')

const Book=require('../models/book');
const ErrorResponse = require('../utils/errorResponse');

exports.addBook=async (req,res,next)=>{
    if(req.id!=='admin'){
        res.status(403).json({success:false,message:"Not an Admin"})
    }
    const {title,author,price,description,genre,image}=req.body;
    try{
        const result=await cloudinary.uploader.upload(image,{
            folder:"images"
        })

        const books=await Book.create({
            title,
            price,
            genre,
            author,
            description,
            image:{
                public_id:result.public_id,
                url:result.secure_url
            }
        })

        res.status(201).json({
            success: true,
            books
        })
    }catch(error){
        
        next(new ErrorResponse("Cannot log in, check your credentials", 400));
    }
}

exports.updateBook=async(req,res,next)=>{
    
    if(req.id!=='admin'){
        return res.status(403).json({success:false,message:"Not an Admin"})
    }
    try {      
        

        //build the data object
        const data = {
            title: req.body.title,
            genre: req.body.genre,
            price: req.body.price,
            author: req.body.author,
            description:req.body.description
        }

        const productUpdate = await Book.findOneAndUpdate({_id:req.params.bookId}, data, { new: true })
        
        return res.status(200).json({
            success: true,
            productUpdate
        })


    } catch (error) {
        
        next(new ErrorResponse("Cannot log in, check your credentials", 400));
    }

}


exports.deleteBook = async (req, res, next) => {

    if(req.id!=='admin'){
        res.status(403).json({success:false,message:"Not an Admin"})
    }
    try {
        const product = await Book.findById(req.params.bookId);
        
        const imgId = product.image.public_id;
        if (imgId) {
            await cloudinary.uploader.destroy(imgId);
        }

        const rmProduct = await Book.findByIdAndDelete(req.params.bookId);
        
        res.status(201).json({
            success: true,
            message: " Product deleted",

        })

    } catch (error) {
        
        next(new ErrorResponse("Cannot log in, check your credentials", 400));

    }

}

exports.getSpecificBooks=async(req,res,next)=>{
    const id=req.params.id
    try{
        const books = await Book.findById(id)
        res.status(201).json({
            success: true,
            books
        })
    }catch(error){
        
        next(new ErrorResponse("Cannot log in, check your credentials", 400));
    }
}

exports.getSpecificGenreBooks=async(req,res,next)=>{
    let plan
    if(req.role==='admin')
    { 
        plan="ADMIN"
    }else{
        plan=req.user.subscription.plan
    }
const genreSearch=req.query.genre
    try{
        const books = await Book.find({genre:genreSearch})
        res.status(201).json({
            success: true,
            books,
            plan
        })
    }catch(error){
        next(new ErrorResponse("Cannot log in, check your credentials", 400));
    }
}

exports.getAllBooks=async (req,res,next)=>{
    let plan
    if(req.role==='admin')
    { 
        plan="ADMIN"
    }else{
        plan=req.user.subscription.plan
    }
    const pageSize = 3;
    const page = Number(req.query.pageNumber) || 1;
    let query = {};
    if (plan === 'LITE') {
        query = { genre: { $ne: 'Business' } };
    }
    try {
        const count = await Book.countDocuments(query);
        const books = await Book.find(query)
            .skip(pageSize * (page - 1))
            .limit(pageSize)
            .select('id title price author image')
            .exec()

        res.status(201).json({
            success: true,
            books,
            page,
            pages: Math.ceil(count / pageSize),
            count,
            plan:plan
        })

    } catch (error) {
        
        next(new ErrorResponse("Cannot log in, check your credentials", 400));
    }

}
