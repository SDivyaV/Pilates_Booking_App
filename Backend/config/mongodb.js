import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/pilatesapp`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("Database Connected Successfully");

        mongoose.connection.on('connected', () => {
            console.log("Mongoose connected to the database");
        });
    } catch (error) {
        console.error("Database connection error:", error);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;
