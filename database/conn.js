import mongoose from 'mongoose';

const connectMongoDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGODB_URI);

    if (connection.readyState == 1) {
      console.log('Connnected');
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export default connectMongoDB;
