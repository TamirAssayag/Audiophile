import { mapGetters } from 'vuex'

export default {
  methods: {
    logConsole(param) {
      console.log(param)
    },
    incrementQuantity() {
      if (this.quantity && this.quantity <= 19) this.quantity++
    },
    decrementQuantity() {
      if (this.quantity === 1) return
      if (this.quantity) this.quantity--
    },
  },
  computed: {
    ...mapGetters({
      products: 'products/products',
      cart: 'products/cart',
      msg: 'products/msg',
      getUser: 'user/getUser',
      users: 'user/users',
      grandTotal: 'products/getGrandTotal',
      getTotalCartItems: 'products/getTotalCartItems',
    }),
  },
}
