import sumBy from 'lodash/sumBy'
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

  getAllUserOrders: (state, getters, rootState, rootGetters) => {
    return state.user?.orders?.length
      ? state.user.orders.map((order) => {
          const mappedCart = order.cart.map((cartItem) => ({
            ...rootGetters['products/getProductById'](cartItem?.productId),
            quantity: cartItem.quantity,
          }))
          return {
            ...order,
            cart: mappedCart,
            grandTotal: sumBy(mappedCart, (item) => item.quantity * item.price),
          }
        })
      : []
  },

  getLastOrder: (state, getters) =>
    getters.getAllUserOrders[getters.getAllUserOrders.length - 1].cart,
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
