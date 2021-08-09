const state = () => ({
  user: {},
  users: [],
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
  users: (state) => {
    return state.users
  },
  errorMsg: (state) => {
    return state.errorMsg
  },
  getUser: (state) => {
    return state.user
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
