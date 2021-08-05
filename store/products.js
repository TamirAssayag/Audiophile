import Vue from 'vue'
import sumBy from 'lodash/sumBy'

const state = () => ({
  products: [],
  cart: [],
})

const mutations = {
  setProducts(state, entries) {
    state.products = entries
  },
  setCart(state, entries) {
    state.cart = entries
  },

  addProductToCart(state, { name, product, quantity, _uid }) {
    const identifier = state.cart.findIndex((i) => i._uid === _uid)
    const cartItem = state.cart.find((item) => item._uid === _uid)
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
    } else {
      // Updates quantity
      state.cart[identifier].quantity += quantity
    }
  },
  incrementQuantity(state, { _uid }) {
    const identifier = state.cart.findIndex((i) => i._uid === _uid)
    state.cart[identifier].quantity++
  },

  decrementQuantity(state, { _uid }) {
    const identifier = state.cart.findIndex((i) => i._uid === _uid)
    state.cart[identifier].quantity--
    if (!state.cart[identifier].quantity) {
      Vue.delete(state.cart, identifier)
    }
  },

  removeAllCartItems(state) {
    state.cart = []
  },
}

const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

const actions = {
  setCart({ commit, state }, entries) {
    commit('setCart', entries)
    saveToLocalStorage('cart', state.cart)
  },
  addProductToCart({ commit, state }, { name, product, quantity, _uid }) {
    commit('addProductToCart', { name, product, quantity, _uid })
    saveToLocalStorage('cart', state.cart)
  },
  incrementQuantity({ commit, state }, { _uid }) {
    commit('incrementQuantity', { _uid })
    saveToLocalStorage('cart', state.cart)
  },
  decrementQuantity({ commit, state }, { _uid }) {
    commit('decrementQuantity', { _uid })
    saveToLocalStorage('cart', state.cart)
  },
  removeAllCartItems({ commit, state }) {
    commit('removeAllCartItems')
    saveToLocalStorage('cart', state.cart)
  },
}

const getters = {
  products: (state) => {
    return state.products
  },
  cart: (state) => {
    return state.cart
  },
  getGrandTotal: (state) => {
    return sumBy(state.cart, (item) => item.quantity * item.price)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
