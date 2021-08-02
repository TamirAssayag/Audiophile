import { mapGetters } from 'vuex'

export default {
  methods: {
    saveProductsToLocalStorage(products) {
      localStorage.setItem('products', JSON.stringify(products))
    },
  },

  computed: {
    ...mapGetters({
      products: 'products/products',
    }),
  },
}
