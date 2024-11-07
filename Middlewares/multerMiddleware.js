const multer=require('multer')

const storage=multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./Uploads')
    },
    filename:(req,file,callback)=>{
        const UserId=req.payload
        const filename=`image-${UserId}-${file.originalname}`
        callback(null,filename)
    }
})

const fileFilter=(req,file,callback)=>{
    if(file.mimetype=="image/png" || file.mimetype=="image/jpg" || file.mimetype=="image/jpeg"
         || file.mimetype=="image/webp"){
        callback(null,true)
    }else{
        callback(null,false)
        return callback(new Error("Please upload the following file extentions(jpg/png/jpeg/webp)"))
    }
}

const multerConfig = multer({
    storage,fileFilter
})

module.exports=multerConfig