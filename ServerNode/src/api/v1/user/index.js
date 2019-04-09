import boom from 'boom'
import User from '../../../models/user'

function createUserRoutes(server) {
	server.route([
		{// Login method
			method: 'POST',
			path: '/api/v1/user',
			handler: async (request) => {
				try {
					const { username, password } = request.payload
					const state = await User.find({ username, password })
					if (!state.length) throw boom.badRequest('Username and/or password incorrect')
					return state
				} catch (err) { throw boom.boomify(err) }
			},
		},
		{// Add user
			method: 'POST',
			path: '/api/v1/user/add',
			handler(request) {
				const { fullName, username, password } = request.payload
				const user = new User({ fullName, username, password })
				return user.save()
			},
		},
	])
}

export default createUserRoutes
