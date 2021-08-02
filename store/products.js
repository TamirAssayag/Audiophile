export const state = () => ({
  products: [],
})

export const mutations = {
  setProducts(state, entries) {
    state.products = entries
  },
}

export const getters = {
  products: (state) => {
    return state.products
  },
}
