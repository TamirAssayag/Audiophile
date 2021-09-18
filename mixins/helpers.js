import { mapGetters } from 'vuex'

export default {
  methods: {
    logConsole(param) {
      console.log(param)
    },
    incrementQuantity() {
      if (this.quantity && this.quantity < 20) this.quantity++
      else {
        this.$root.$emit('snackbar', {
          text: "You've reached max quantity",
        })
      }
    },
    decrementQuantity() {
      if (this.quantity === 1) return
      if (this.quantity) this.quantity--
    },
    isLoggedIn() {
      return this.loggedIn ? this.$router.push('/') : true
    },
    getFormattedDate(date) {
      if (date) return this.$dayjs(date).format('D MMM YYYY')
    },
  },
  computed: {
    displayName() {
      return this.getUser.name?.split(' ').slice(0, -1).join(' ')
    },
    userCapitalLetters() {
      return this.getUser.name
        .split(' ')
        .map((name) => name.substring(0, 1))
        .join('')
        .toUpperCase()
    },
    navigation() {
      return [
        { name: 'Home', link: '/' },
        { name: 'Headphones', link: '/headphones' },
        { name: 'Speakers', link: '/speakers' },
        { name: 'Earphones', link: '/earphones' },
      ]
    },
    ...mapGetters({
      products: 'products/products',
      cart: 'cart/cart',
      getUser: 'user/getUser',
      loggedIn: 'user/isLoggedIn',
      grandTotal: 'cart/getGrandTotal',
      getTotalCartItems: 'cart/getTotalCartItems',
    }),
  },
}
