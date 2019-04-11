import boom from 'boom'
// import Gpio from 'pigpio'
import NodeWebcam from 'node-webcam'
import util from 'util'
import Door from '../../../models/door'

const takePhoto = util.promisify(NodeWebcam.capture)// Convert callback in promise

const option = {
	callbackReturn: 'base64',
}

let intruder = 0

// const bathDoor = new Gpio(10, { mode: Gpio.OUTPUT })
// const mainDoor = new Gpio(11, { mode: Gpio.OUTPUT })
// const motionSensor = new Gpio(12, { mode: Gpio.INPUT })

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
			handler(request) {
				const { description, id, state } = request.payload
				const door = new Door({ description, id, state })
				return door.save()
			},
		},
		{// Update door state
			method: 'PUT',
			path: '/api/v1/house/door',
			handler: async (request) => {
				try {
					const { state } = request.payload
					const result = await Door.findOneAndUpdate({ id: request.payload.id }, { state })
					if (result === null) throw boom.badRequest('Incorrect id')
					/* if (request.payload.id === 'bath') {
						if (request.payload.state === 0) {
							bathDoor.servoWrite(100)
						} else {
							mainDoor.servoWrite(100)
						}
					} else if (request.payload.id === 'main') {
						if (request.payload.state === 0) {
							mainDoor.servoWrite(100)
						} else {
							mainDoor.servoWrite(100)
						}
					} */
					return result
				} catch (err) { throw boom.boomify(err) }
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
