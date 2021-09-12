import Vue from 'vue'
import { findIndex, sumBy, find } from 'lodash'
import { genGrandTotal } from '../mixins/utils.js'

const state = () => ({
  cart: [],
})

const mutations = {
  setCart(state, entries) {
    state.cart = entries
  },

  addProductToCart(state, { name, product, quantity, _uid }) {
    const identifier = findIndex(state.cart, (i) => i._uid === _uid)
    const cartItem = find(state.cart, (item) => item._uid === _uid)
    // Finds if cart item is already exist in cart, if not then push,
    // else update and increment the quantity only.
    if (!cartItem) {
      state.cart.push({
        name,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity,
        _uid,
      })
    } else if (state.cart[identifier].quantity <= 19) {
      // Updates quantity
      state.cart[identifier].quantity += quantity
    }

    if (state.cart[identifier]?.quantity > 20) {
      state.cart[identifier].quantity = 20
    }
  },

  incrementQuantity(state, { _uid }) {
    const identifier = findIndex(state.cart, (i) => i._uid === _uid)
    state.cart[identifier].quantity++
  },

  decrementQuantity(state, { _uid }) {
    const identifier = findIndex(state.cart, (i) => i._uid === _uid)
    state.cart[identifier].quantity--
    if (!state.cart[identifier].quantity) {
      Vue.delete(state.cart, identifier)
    }
  },

  removeAllCartItems(state) {
    state.cart = []
  },
}

const actions = {
  setCart({ commit, state }, entries) {
    commit('setCart', entries)
  },
  addProductToCart({ commit, state }, { name, product, quantity, _uid }) {
    commit('addProductToCart', { name, product, quantity, _uid })
  },
  incrementQuantity({ commit, state }, { _uid }) {
    commit('incrementQuantity', { _uid })
  },
  decrementQuantity({ commit, state }, { _uid }) {
    commit('decrementQuantity', { _uid })
  },
  removeAllCartItems({ commit, state }) {
    commit('removeAllCartItems')
  },
}

const getters = {
  cart: (state) => {
    return state.cart
  },
  //   getWaitingCart: (state) => {
  //     return state.waitingCart
  //   },
  getGrandTotal: (state) => genGrandTotal(state.cart),
  getTotalCartItems: (state) => {
    if (state.cart.length) return sumBy(state.cart, (item) => item.quantity)
    return 0
  },
  getCartProductById(state) {
    return (_uid) => {
      return state.cart.find((product) => product._uid === _uid)
    }
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
