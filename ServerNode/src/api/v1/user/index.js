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
			handler: async (request) => {
				const { fullName, username, password } = request.payload
				const state = await User.find({ username })
				if (state.length) throw boom.badRequest('Username already in use, please choose another username')
				const user = new User({ fullName, username, password })
				return user.save()
			},
		},
		{// Change password
			method: 'POST',
			path: '/api/v1/user/password',
			handler: async (request) => {
				const { username, password, newPassword } = request.payload
				const state = await User.find({ username, password })
				if (!state.length) throw boom.badRequest('Old password incorrect')
				const result = await User.findOneAndUpdate(
					{ username: request.payload.username }, { password: newPassword },
				)
				if (result === null) throw boom.badRequest('Incorrect, try again later')
				return result
			},
		},
	])
}

export default createUserRoutes
