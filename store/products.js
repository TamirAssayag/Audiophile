import Vue from 'vue'
import sumBy from 'lodash/sumBy'

const state = () => ({
  products: [],
  cart: [],
  msg: '',
})

const mutations = {
  setProducts(state, entries) {
    state.products = entries
  },
  setCart(state, entries) {
    state.cart = entries
  },
  setRelations(state, entries) {
    state.products = entries
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
      return (state.msg = {
        message: `Added ${name} to cart`,
      })
    } else if (state.cart[identifier].quantity <= 19) {
      // Updates quantity
      state.cart[identifier].quantity += quantity
      return (state.msg = {
        message: `Updated  ${name} in Cart`,
      })
    } else {
      return (state.msg = {
        message: 'Cart cannot be updated at this moment',
      })
    }
  },
  incrementQuantity(state, { _uid }) {
    const identifier = state.cart.findIndex((i) => i._uid === _uid)
    if (state.cart[identifier].quantity <= 20 - 1) {
      state.cart[identifier].quantity++
    } else {
      return (state.msg = {
        message: "Can't update item quantity due to max quantity",
      })
    }
  },

  decrementQuantity(state, { _uid }) {
    const identifier = state.cart.findIndex((i) => i._uid === _uid)
    state.cart[identifier].quantity--
    if (!state.cart[identifier].quantity) {
      Vue.delete(state.cart, identifier)
      return (state.msg = {
        message: 'Removed Product From Cart',
      })
    }
  },

  removeAllCartItems(state) {
    state.cart = []
    return (state.msg = {
      message: 'Removed All Products From Cart',
    })
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
  setRelations({ commit }, entries) {
    commit('setRelations', entries)
    console.log(entries)
  },
  addProductToCart(
    { commit, state, getters },
    { name, product, quantity, _uid }
  ) {
    if (getters.getTotalCartItems >= 99)
      return (state.msg = {
        message: "Can't update cart due to a limit of 99 items",
      })
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
  rels: (state) => {
    return state.rels
  },
  msg: (state) => {
    return state.msg
  },
  getGrandTotal: (state) => {
    return sumBy(state.cart, (item) => item.quantity * item.price)
  },
  getTotalCartItems: (state) => {
    if (state.cart.length) return sumBy(state.cart, (item) => item.quantity)
    return 0
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
