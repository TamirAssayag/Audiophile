const state = () => ({
  products: [],
  allProducts: [],
})

const mutations = {
  setProducts(state, entries) {
    state.products = entries
  },
  setAllProducts(state, entries) {
    state.allProducts = entries
  },
  setRelations(state, entries) {
    state.products = entries
  },
}

const actions = {
  setRelations({ commit }, entries) {
    commit('setRelations', entries)
  },
}

const getters = {
  products: (state) => {
    return state.products
  },
  getAllProducts: (state) => {
    return state.allProducts
  },
  getProductById(state) {
    return (_uid) => {
      return state.allProducts
        .map((product) => product.content)
        .find((item) => item._uid === _uid)
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
