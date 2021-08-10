const state = () => ({
  user: {},
})

const mutations = {
  saveUser(state, payload) {
    if (payload) {
      state.user = payload
    }
  },

  updateUser(state, id) {},

  logoutUser(state) {
    localStorage.removeItem('user')
    state.user = {}
  },
}

const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

const actions = {
  saveUser({ commit, state }, payload) {
    commit('saveUser', payload)
    saveToLocalStorage('user', state.user)
  },

  logoutUser({ commit }) {
    commit('logoutUser')
  },
}

const getters = {
  getUser: (state) => {
    return state.user
  },

  isLoggedIn: (state) => {
    const userId = state?.user?._id
    return !!userId || false
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
