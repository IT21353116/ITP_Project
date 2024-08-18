import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { createError } from "../util/error.js";
import jwt from "jsonwebtoken";

export const register = async (req,res,next) => {
    try{
        //copy it from bcrypt.js --hashing password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        //chatGPT for this part
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,

        })
        await newUser.save()
        res.status(200).send("user has been created...")
    }
    catch(err){
        next(err)

    }
}

export const login = async (req,res,next) => {
    try{
        //copy it from bcrypt.js --compare password
        //chatGPT
        const user = await User.findOne({username:req.body.username})
        if(!user) return next(createError(404,"User not found!"));

        const  isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);

        if(!isPasswordCorrect) return next(createError(400,"wrong password or userName!"))
        //remove password and isAdmin status from client-side

        //install to jwt using jwt to 
        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT);
        //use cookie parser to set a middlewarer to determne admin status

        const {password, isAdmin, ...otherDetails} = user._doc;

        res.cookie("access_token",token,{
            httpOnly: true,
        } )//use hhtpOnly to dont leak the info..check chatgpt for more info..
        .status(200).json({details:{...otherDetails}, isAdmin})
    }
    
    catch(err){
        next(err)

    }
}