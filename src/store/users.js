import fb from 'firebase/app'
import "firebase/auth"
import "firebase/firestore"
import 'firebase/database'
import 'firebase/storage'


class User {
	constructor(id) {
		this.id = id
	}
}
class Users {
	constructor(
		name,
		phone,
		password,
		email,
		imageSrc = '',
		id=null
	) {
		this.name = name
		this.phone = phone
		this.password = password
		this.email = email,
		this.imageSrc = imageSrc
		this.id = id
	}
}

export default {
	state: {
	user: null,
	users: [],
	},
	mutations: {
		setUser(state, payload) {
		state.user = payload
		},
		createUser(state, payload) {
			state.users.push(payload)
		},
		loadUsers (state, payload) {
			state.users = payload
		},
		updateAd (state, payload) {
			const newUsers = state.users.map(user => {
				if ( payload.id === user.id ) {
					user = {...payload}
				}
			})
			state.users = [...newUsers]
		}
	},
	actions: {
		async registerUser({commit}, {email, password}) {
			commit('clearError')
			commit('setLoading', true)
			const user = await fb.auth().createUserWithEmailAndPassword(email, password)
			try {
				commit('setLoading', false)
				commit('setUser', new User(user.uid))
			}
			catch (error) {
				commit('setLoading', false)
				commit('setError', error.message)
				throw error;
				}
		},

		async loginUser ({commit}, { email, password }) {
			commit('clearError')
			commit('setLoading', true)
			const user = await fb.auth().signInWithEmailAndPassword(email, password)
			try {
				commit('setLoading', false)
				commit('setUser', new User(user.uid))
			}
			catch (error) {
				commit('setLoading', false)
				commit('setError', error.message)
				throw error;
			}
		},

		autoLogUser ({commit}, payload){
			commit('setUser', new User(payload.uid))
		},
		logOutUser({commit}){
			fb.auth().signOut()
			commit('setUser', null)
		},
		async createUser ({commit}, payload) {
			commit('clearError')
			commit('setLoading', true)
			try {
				const newUser = new Users(
					payload.name,
					payload.phone,
					payload.password,
					payload.email,
					'',
					payload.id)

				const user = await fb.database().ref('users').push(newUser);
				console.log('user create', user.key, `users/${user.key}`)
				const userKey = { ...user, key: user.key }
				await fb.database().ref(`users/${user.key}`).update(userKey)

				commit('createUser', userKey)
				commit('setLoading', false)

			} catch (e) {
				commit('setError', e.message)
				commit('setLoading', false)
				console.log(e.message)
				throw e
			}
		},
		async updatePhoto({commit}, payload) {
			commit('clearError')
			commit('setLoading', true)
			try {
				const image = payload
				const imageExt = image.name. slice(image.name.lastIndexOf('.'))
				const user = this.getters.getUserById(fb.auth().currentUser.uid)
				const path = `${user.uid}${imageExt}`
				const storageRef = fb.storage().ref('users')
				const img = await storageRef.child(path)

				if ( img ) {
					await storageRef.child(path).delete()
				}

				await storageRef.child(path).put(image)
				const imageSrc = await storageRef.child(path).getDownloadURL()
				console.log('this.store.user', user.uid, imageExt)
				const newUser= {...user, imageSrc: imageSrc}

				await fb.database().ref(`users/${newUser.key}`).update(newUser)
				commit('updateUser', newUser)
				commit('setLoading', false)
			}catch (e) {
				commit('setError', e.message)
				commit('setLoading', false)
				throw e
			}
		},

		async fetchUsers ({commit}) {
			commit('clearError')
			commit('setLoading', true)
			const  resultUsers = []

			try {
				const fbVal = await fb.database().ref('users').once('value')
				const users= fbVal.val()
				Object.keys(users).forEach(key =>{
					const user = users[key]
					resultUsers.push(
						new Users(user.name, user.phone, user.password, user.email, user.imageSrc, user.id)
					)
				})
				commit('loadUsers', resultUsers)
				commit('setLoading', false)
			} catch (e) {
				commit('setError', e.message)
				commit('setLoading', false)
				throw e
			}
		},

	},
	getters: {
		getUserById(state) {
			return id =>{
				return state.users.find(user => user.id === id)
			}
		},
		user (state) {
			return state.user
		},
		getUsers (state) {
			return state.users
		},
		isUserLoggedIn (state) {
			return state.user !== null
		}
	}
}