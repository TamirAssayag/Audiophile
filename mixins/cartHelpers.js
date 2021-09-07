import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions({
      incrementQuantity: 'cart/incrementQuantity',
      decrementQuantity: 'cart/decrementQuantity',
      removeAllCartItems: 'cart/removeAllCartItems',
    }),
    quantityControl(quantity) {
      if (typeof quantity === 'number') return quantity.toString()
    },
    onIncremenet(item) {
      if (item.quantity < 20) {
        this.incrementQuantity({
          _uid: item._uid,
        })
      } else {
        this.$root.$emit('snackbar', {
          text: "Can't update item quantity due to max quantity",
        })
      }
    },
    onDecrement(item) {
      this.decrementQuantity({
        _uid: item._uid,
      })
      if (!item.quantity) {
        this.$root.$emit('snackbar', { text: 'Removed product from cart' })
      }
    },
    deleteAllCartItems() {
      this.removeAllCartItems()
      this.$root.$emit('snackbar', { text: 'Removed all products in cart' })
    },
  },
}
