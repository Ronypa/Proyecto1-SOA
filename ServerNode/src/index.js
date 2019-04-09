import Hapi from 'hapi'
import mongoose from 'mongoose'
import createUserRoutes from './api/v1/user'
import createHouseRoutes from './api/v1/house'

// To use the update correctly
mongoose.set('useFindAndModify', false)

// Create a server with a host and port
const server = Hapi.server({
	host: 'localhost',
	port: 8084,
})

// Add routes
createUserRoutes(server)
createHouseRoutes(server)


// Start the server
const start = async function startServer() {
	try {
		// Connect to mongo instance
		console.log('Connecting to database')
		await mongoose.connect('mongodb+srv://rolo:18001801a@cluster0-rnvr7.mongodb.net/test?retryWrites=true',
			{ useNewUrlParser: true })

		await mongoose.connection.once('open', () => {
			console.log('connected to database')
		})

		console.log('starting server')
		await server.start()

		// To send files
		await server.register(require('inert'))
	} catch (err) {
		console.log(err)
		process.exit(1)
	}
	console.log('Server running at:', server.info.uri)
}

start()
