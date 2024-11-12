import trainerModel from "../models/trainerModel.js";

// API to add a new trainer
const addTrainer = async (req, res) => {
  const { name, email, image, speciality, certification, experience, about, fees, address, available } = req.body;

  // Check if required fields are provided
  if (!name || !email || !fees || !speciality || !image) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  let numericFees = fees;

  if (typeof fees === 'string') {
    numericFees = parseInt(fees.replace(/\D/g, ''), 10); // Remove non-numeric characters
  }

  try {
    const existingTrainer = await trainerModel.findOne({ email });
    if (existingTrainer) {
      return res.status(400).json({
        success: false,
        message: 'Trainer with this email already exists',
      });
    }

    const newTrainer = new trainerModel({
      name,
      email,
      image,
      speciality,
      certification,
      experience,
      about,
      fees: numericFees, 
      address,
      available
    });

    await newTrainer.save();

    res.status(201).json({
      success: true,
      message: 'Trainer added successfully',
      trainer: newTrainer
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error adding trainer',
      error: error.message
    });
  }
};


const getTrainerList = async (req, res) => {
    try {
        const trainers = await trainerModel.find({}).select('-password');
        res.json({ success: true, trainers });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const getTrainerById = async (req, res) => {
    const { id } = req.params;

    try {
        const trainer = await trainerModel.findById(id);
        if (!trainer) {
            return res.status(404).json({ message: 'Trainer not found' });
        }

        // Safely access properties, ensure trainer is not null
        console.log('Trainer Availability:', trainer.available);
        res.json(trainer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};

/*const bookSession = async (req, res) => {
    const { trainerId, userId, date, time } = req.body;
    try {
      const trainer = await trainerModel.findById(trainerId);
      if (!trainer) {
        return res.status(404).json({ message: 'Trainer not found' });
      }
      if (!trainer.available) {
        return res.status(400).json({ message: 'Trainer is not available' });
      }
  
      // Proceed with the session booking (this part will depend on your logic)
      // For example: Save the booking information
  
      res.status(200).json({ message: 'Session booked successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error booking session', error });
    }
  };*/
  
export { getTrainerList, getTrainerById, addTrainer };
