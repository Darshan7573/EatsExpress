import mongoose from "mongoose";


export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://darshu7375:uFvkMUbihqENrFar@cluster0.ntqwsmb.mongodb.net/Eats-Express').then(() => {
        console.log('DB Connected')
    })
}