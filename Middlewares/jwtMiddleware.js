const jwt=require('jsonwebtoken');

const jwtMiddleware=(req,res,next)=>{
    try{
        const token=req.headers['authorization'].split(' ')[1];
        if(token){
            const jwtResponse=jwt.verify(token,process.env.JWT_SECRETKEY);
            req.payload=jwtResponse.UserId
             next()
            }else{
             res.status(401).json('Please Provide a token')
            }
    }catch{
        res.status(403).json("please Login")
       }
}
module.exports=jwtMiddleware