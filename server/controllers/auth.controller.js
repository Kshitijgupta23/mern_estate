import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const signup = async (req,res,next) =>{
    const {username, email, password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({username, email, password: hashedPassword});
    try{
        await newUser.save();
        res.status(201).json({message: "User saved successfully"});
    }catch(err){
        next(err);
    }
};

export const signin = async(req,res,next) =>{
    const {email, password} = req.body;
    try {
        const validUser = await User.findOne({email});  
        if(!validUser) return next(errorHandler(404,"User not found!"));
        const validPassword = bcryptjs.compareSync(password,validUser.password);
        if(!validPassword) return next(errorHandler(401,"Wrong credentials!"));

        const token = jwt.sign({id: validUser._id},process.env.JWT_SECRET);
        const { password: pass, ...rest} = validUser._doc;  // Excluding password from the user data we are getting
        res.cookie('access_token',token,{httpOnly: true, expires:new Date(Date.now() + 25892000000)})
        .status(200).json(rest)  //Expires after 30 days

    }catch(error) {
        next(error);
    }
}