import boom from 'boom'
import PiCamera from 'pi-camera'
import Gpio from 'pigpio'
import Door from '../../../models/door'

const myCamera = new PiCamera({
	mode: 'photo',
	output: `${ __dirname }/test.jpg`,
	width: 640,
	height: 480,
	nopreview: true,
})

// const bathDoor = new Gpio(10, { mode: Gpio.OUTPUT })
// const mainDoor = new Gpio(11, { mode: Gpio.OUTPUT })


function createDoorRoutes(server) {
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
			handler(request, reply) {
				myCamera.snap()
					.then(result => reply.file('/home/raulaq/lock.png'))
					.catch((error) => {
						console.log(error)
					})
			},
		},
	])
}

export default createDoorRoutes
