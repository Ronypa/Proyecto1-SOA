import mongoose from 'mongoose'

const { Schema } = mongoose

// User model
const UserSchema = new Schema({
	fullName: String,
	username: String,
	password: String,
	interval: Number,
})

export default mongoose.model('User', UserSchema)
