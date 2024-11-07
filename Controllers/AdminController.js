const admin=require('../Models/AdminSchema');
const jwt=require('jsonwebtoken');

exports.adminRegistration=async(req,res)=>{
    const {adminname,adminEmail,adminPassword}=req.body;
    // const adminProfile=req.file?req.file.filename:"";
    try{
      const existingAdmin=await admin.findOne({adminEmail});
      if(existingAdmin){
        res.status(406).json("Admin is Already Existing...")
      }else{
        const newAdmin=new admin({
            adminname,adminEmail,adminPassword
        });
        await newAdmin.save();
        res.status(200).json(newAdmin)
      }
    }catch(err){
        console.log("Error at AdminController.js/adminRegistration catch(401)::::",err); 
    }
}

exports.adminlogin=async(req,res)=>{
    const{adminEmail,adminPassword}=req.body;
    try{
        const existingAdmin=await admin.findOne({adminEmail,adminPassword});
       if(existingAdmin){
        const adminToken=jwt.sign({adminId:existingAdmin._id},process.env.JWT_SECRETKEY);
        res.status(200).json({adminToken,existingAdmin});
       }else{
        res.status(406).json("Invalid Email  or Password::::");
       }
    }catch(err){
        console.log("Error at catch in adminController.js/adminLogin:::::::");
        
    }
}