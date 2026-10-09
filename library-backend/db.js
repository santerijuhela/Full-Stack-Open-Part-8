const mongoose = require('mongoose')

const connectToDatabase = async (uri) => {
  console.log('connecting to database URI: ', uri)

  try {
    await mongoose.connect(uri)
    console.log('connected to MongoDB')
  } catch (error) {
    console.log('error when trying to connect to MongoDB: ', error)
    process.exit(1)
  }
}

module.exports = connectToDatabase