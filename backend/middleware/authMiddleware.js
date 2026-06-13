import jwt from "jsonwebtoken";

export const verifyUser = (req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({success:false,Error: "You are not authorized",});
    }
    try{
        jwt.verify(token, process.env.JWT_SECRET, (err,decoded)=>{
            if(err){
                res.status(400).json({Error: "Token is not okay"});
            }
            else{
                req.user = {
                    id: decoded.userId,
                    username: decoded.userName
                };
                next();
            }
        })
    }
    catch(err){
        res.status(401).json({success:false,message:"Invalid Token"});
    }
}