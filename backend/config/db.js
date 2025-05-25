import mongoose from 'mongoose';
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:');
  console.error('Error Message:', err.message);
  console.error('Error Stack:', err.stack);
  }
};

export default connectDB;