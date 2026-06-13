import {sql} from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";





const salt = 16;

export const registerUser = async (req,res)=>{
    const {username,email,password} = req.body;
    try {
        const checkUserPresent = await sql `SELECT * FROM users WHERE email=${email}`;
        if(checkUserPresent.length>0){
            res.status(409).json(({success:false,message:"User Already Registered"}));
        }
        else{
            bcrypt.hash(password.toString(),salt,async(err,hash)=>{
                if(err){
                    console.log("error in hashing password",err);
                }
                else{
                    const insertUser = await sql `INSERT INTO users (username,email,password) VALUES (${username},${email},${hash})`;
                    console.log(insertUser);
                    res.status(200).json({success:true,message:insertUser[0]});
                }
            })
        }

     } catch (err) {
        console.log("Register User Error",err);
        res.status(500).json({success:false,message:"Internet Server Error"});}
    }


export const loginUser = async (req,res)=>{
    const email = req.body.email;
    const typedPassword = req.body.password;
    try {
        const checkUser = await sql `SELECT * FROM users WHERE email = ${email}`;
        if(checkUser.length>0){
            const user = checkUser[0];
            const hashedPassword = user.password;
            console.log("type",typedPassword);
            console.log("hash",hashedPassword)
            
            await bcrypt.compare(typedPassword,hashedPassword,(err,result)=>{
                if(err){
                    console.log("Error in hash matching",err);
                }
                else{
                    if(result){
                        const userId = user.id;
                        const userName = user.username;
                        const token = jwt.sign({userId,userName},process.env.JWT_SECRET,{expiresIn:"30m"});
                        res.cookie("token",token);
                        res.status(200).json({success:true,message:user});
                    }
                    else{
                        res.status(400).json({success:false,message:"Incorrect Password"});
                    }
                }
            })
        }
        else{
            res.status(400).json({success:false,message:"User not found"});
        }
    } catch (err) {
        console.log("Error in login",err);
        res.status(500).json({success:false,message:"Internet Server Error"});
    }
};


export const logoutUser = async (req,res)=>{
    res.clearCookie('token');
    res.status(200).json({success:true,message:"logged out successfully"});
}



