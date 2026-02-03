import mongoose from 'mongoose'

export const connectDB = async () => {
  const MONGO_URI = process.env.MONGO_URI
  if (!MONGO_URI) {
    throw new Error('MONGO_URL is not defined')
  }
  try {
    await mongoose.connect(MONGO_URI)
    console.log('Mongo connected')
  } catch (error) {
    console.log('Mongo connection failed: ', error)
    process.exit(1)
  }
}
