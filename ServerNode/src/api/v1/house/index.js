import boom from 'boom'
import NodeWebcam from 'node-webcam'
import util from 'util'
import Door from '../../../models/door'

const { Gpio } = require('pigpio')

const takePhoto = util.promisify(NodeWebcam.capture)// Convert callback in promise

const option = {
	callbackReturn: 'base64',
}

let intruder = 0

// const bathDoor = new Gpio(22, { mode: Gpio.OUTPUT })
// const mainDoor = new Gpio(23, { mode: Gpio.OUTPUT })
// const motionSensor = new Gpio(24, { mode: Gpio.INPUT })

setInterval(() => { // Detect intruder
	/* let detected = motionSensor.digitalRead()
	if (detected == 1){
		intruder = 1
	} */
}, 5000)// Time in ms


function createHouseRoutes(server) {
	server.route([
		{// Get doors state
			method: 'GET',
			path: '/api/v1/house/door',
			handler() {
				return Door.find()
			},
		},
		{// Add door
			method: 'POST',
			path: '/api/v1/house/door',
			handler: async (request) => {
				const {
					description, id, state, lockable, locked, lockedBy,
				} = request.payload
				const response = await Door.find({ id })
				if (response.length) throw boom.badRequest('Door id already in use, please choose another id')
				const door = new Door({
					description, id, state, lockable, locked, lockedBy,
				})
				return door.save()
			},
		},
		{// Update door state
			method: 'PUT',
			path: '/api/v1/house/door',
			handler: async (request) => {
				try {
					const {
						state, id, username, locked,
					} = request.payload
					if (id === 'bath') {
						const response = await Door.find({ id })
						if (!response.length) throw boom.badRequest('Error finding door')
						else if (response[0].locked && username !== response[0].lockedBy) throw boom.badRequest('Door locked by another user')
					}
					const result = await Door.findOneAndUpdate({ id: request.payload.id }, { state, locked })
					if (result === null) throw boom.badRequest('Incorrect id')
					/* if (request.payload.id === 'bath') {
						if (request.payload.state === 0) {
							bathDoor.servoWrite(2300)
						} else {

							bathDoor.servoWrite(1300)
						}
					} else if (request.payload.id === 'front') {
						if (request.payload.state === 0) {
							mainDoor.servoWrite(2200)
						} else {
							mainDoor.servoWrite(1300)
						}
					} */
					return result
				} catch (err) { throw boom.boomify(err) }
			},
		},
		{// Lock door
			method: 'PUT',
			path: '/api/v1/house/doorLock',
			handler: async (request) => {
				let result = ''
				const {
					state, id, lockedBy, locked,
				} = request.payload
				if (id === 'bath') {
					const response = await Door.find({ id })
					if (!response.length) throw boom.badRequest('Error finding door')
					else {
						result = await Door.findOneAndUpdate({ id: request.payload.id },
							{ state, locked, lockedBy })
					}
				}
				return result
			},
		},
		{// Take picture
			method: 'GET',
			path: '/api/v1/house/camera',
			handler: async () => {
				const photo = await takePhoto('test_picture', option)
				return { image: photo }
			},
		},
		{// Get sensor state
			method: 'GET',
			path: '/api/v1/house/intruder',
			handler() {
				const state = intruder
				intruder = 0
				return { state }
			},
		},
	])
}

export default createHouseRoutes
