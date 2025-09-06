import { json } from "express";

const notFound = (req,res,next)=>{
    
    console.log(req);
    const error = new Error(`Not Found ${req.originalUrl}`)
    next(error);
}

const errorHandle = (err,req,res,next)=>{
        let statusCode = res.statusCode === 500 ? res.statusCode : null;
        let message = err.message;
    if(err.name === 'CastError'){
         message = `Resource not found`
         statusCode = 404;
         console.log('Resource not found')
    }
    res.status(statusCode).json({message});
}

export  {notFound,errorHandle};