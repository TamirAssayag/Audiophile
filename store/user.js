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

  saveGrandTotal(state, payload) {},

  updateUser(state, id) {},

  logoutUser(state) {
    state.user = {}
  },
}

const actions = {
  saveUser({ commit, state }, payload) {
    commit('saveUser', payload)
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
          const total = sumBy(mappedCart, (item) => item.quantity * item.price)
          const vat = (20 / 100) * total
          return {
            ...order,
            cart: mappedCart,
            grandTotal: total + vat + 50,
          }
        })
      : []
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
