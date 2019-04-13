import mongoose from 'mongoose'

const { Schema } = mongoose

// Door model
const DoorSchema = new Schema({
	description: String,
	id: String,
	state: Number,
	lockable: Boolean,
	locked: Boolean,
	lockedBy: String,
})

export default mongoose.model('Door', DoorSchema)
