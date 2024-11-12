import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import {v2 as cloudinary} from 'cloudinary'
import trainerModel from '../models/trainerModel.js';
import sessionModel from '../models/SessionModel.js';
import trainersData from '../data/trainersData.js';

//API to register user
const registerUser = async (req,res) => {
    try {

        const {name, email, password } = req.body 

        if(!name || !email || !password) {
            return res.json({success: false,message:"Missing Details"})
        }

        //validating email format
        if(!validator.isEmail(email)){
            return res.json({success: false,message:"Enter a valid Email Id"})
        }

        //validating strong password
        if(password.length < 8) {
            return res.json({success: false,message:"Enter a strong password"})
        }

        //Hashing User password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const userData = {
            name,
            email,
            password : hashedPassword
        }

        const newUser = new userModel(userData)

        const user = await newUser.save()

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET)

        res.json({success:true,token})
        

    } catch (error) {
        console.log(error)
        res.json({success:false,message: error.message})
    }
}

//API for user login
const loginUser = async (req,res) => {
    try {

        const {email,password} = req.body
        const user = await userModel.findOne({email})

        if(!user) {
            return res.json({success:false,message:'User does not exist'})
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if(isMatch) {
            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
            res.json({success:true,token})
        } else{
            res.json({success:false,message:"Invalid Credentials"})
        }
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message: error.message})
    }
}

//API to get user profile data
const getProfile = async (req,res) => {
    try {
        
        const { userId } = req.body 

        if (!userId) {
            return res.status(400).json({ success: false, message: 'User ID is required' });
        }

        const userData = await userModel.findById(userId).select('-password')

        console.log(userData)

        if (!userData) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({success:true, userData})
        

    } catch (error) {
        console.log(error)
        res.json({success:false,message: error.message})
    }
}

// API to update user profile
const updateProfile = async (req,res) => {
    try {

        const {userId, name, phone, address, dob, gender} = req.body

        const imageFile = req.file

        if(!name || !phone ||!address ||!dob ||!gender) {
            return res.json({success:false,message:"Data Missing"})
        }

        
        await userModel.findByIdAndUpdate(userId, {name, phone, address ,dob,gender})

        if(imageFile) {
            // upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:'image'})

            const imageURL = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId,{ image:imageURL })
        }
        res.json({ success: true, message:"Profile Updated"})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message: error.message})
    }
}

const bookSession = async (req, res) => {
    try {
        const { userId, trainerId, slotDate, slotTime } = req.body;

        const trainerData = trainersData.find(trainer => trainer._id === trainerId); 

        // Check if the trainer is available (using the data passed from frontend)
        if (!trainerData.available) {
            return res.json({ success: false, message: 'Trainer not available' });
        }

        // Validate ObjectId format if using MongoDB ObjectId's as ids
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: 'Invalid user ID format' });
        }

        if (!trainerData) {
            // Return an error if the trainer isn't found
            return res.status(404).json({ success: false, message: 'Trainer not found' });
        }
        if (!mongoose.Types.ObjectId.isValid(trainerId)) {
            return res.status(400).json({ success: false, message: 'Invalid trainer ID format' });
        }


        // Get the trainer's booked slots and check availability
        let slots_booked = trainerData.slots_booked;

        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: 'Slot not available' });
            } else {
                slots_booked[slotDate].push(slotTime);
            }
        } else {
            slots_booked[slotDate] = [slotTime];
        }

        // Get user data from the database
        const userData = await userModel.findById(userId).select('-password');

        const sessionData = {
            userId,
            trainerId,
            userData,
            trainerData,
            amount: trainerData.fees,
            slotDate,
            slotTime,
            date: Date.now(),
        };

        const newSession = new sessionModel(sessionData);
        await newSession.save();

        // Update trainer's booked slots in the database
        await trainerModel.findByIdAndUpdate(trainerId, { slots_booked });

        res.json({ success: true, message: 'Session Booked' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

//API to get user sessions booked for frontend my appointments page
const listSessions = async (req,res) => {
    try {

        const {userId} = req.body
        const sessions = await sessionModel.find({userId})

        res.json({success: true,sessions})
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

//API to cancel session

const cancelSession = async (req, res) => {
    try {
        const { userId, sessionId } = req.body;

        if (!userId || !sessionId) {
            return res.json({ success: false, message: "User ID or Session ID missing" });
        }

        // Fetch session data
        const sessionData = await sessionModel.findById(sessionId).populate('trainerId'); // Populate trainerId
        if (!sessionData) {
            return res.json({ success: false, message: "Session not found" });
        }

        console.log('Session Data:', sessionData);

        // Verify session user
        if (sessionData.userId.toString() !== userId) {
            return res.json({ success: false, message: "Unauthorized action" });
        }

        const trainerData = sessionData.trainerId; // trainerId will be populated with trainer data
        if (!trainerData) {
            return res.json({ success: false, message: "Trainer not found" });
        }

        console.log('Trainer Data:', trainerData);

        // Releasing Trainer's Slot
        const { slotDate, slotTime } = sessionData;
        let slots_booked = trainerData.slots_booked || {};

        if (slots_booked[slotDate]) {
            slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);
        } else {
            slots_booked[slotDate] = [];
        }

        // Update trainer model with the modified slots_booked
        await trainerModel.findByIdAndUpdate(trainerData._id, { slots_booked });

        // Cancel session
        await sessionModel.findByIdAndUpdate(sessionId, { cancelled: true });

        res.json({ success: true, message: 'Appointment Cancelled' });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


export {registerUser, loginUser, getProfile, updateProfile, bookSession, listSessions, cancelSession}