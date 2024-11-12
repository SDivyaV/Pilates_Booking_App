import mongoose from "mongoose";

const trainerSchema = new mongoose.Schema({
    name: {type: String, required:true},
    email: {type: String, required:true, unique:true},
    password: {type: String, required:false},
    image: {type: String, required:true},
    speciality: {type: String, required:true},
    certification: {type: String, required:true},
    experience: {type: String, required:true},
    about: {type: String, required:true},
    available: {type: Boolean, default: true},
    fees: {type: Number, required:true},
    address: {type: Object, required:true},
    date: {type: Number, required:false},
    slots_booked: {type: Object, default:{}},
},{minimize:false})

const trainerModel = mongoose.models.trainer || mongoose.model('trainer',trainerSchema)

export default trainerModel