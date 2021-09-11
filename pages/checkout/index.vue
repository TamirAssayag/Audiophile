<template>
  <section v-if="loggedIn && cart.length" class="container">
    <OrderForm />
    <Summary @onPay="onContinueAndPay" />
    <ThankYouModal :is-open="isOpen" @onClose="isOpen = false" />
  </section>
  <section v-else>
    <CheckoutErrors />
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import Summary from '../../components/Order/Summary.vue'
import OrderForm from '../../components/Order/OrderForm/OrderForm.vue'
import CheckoutErrors from '../../components/Order/CheckoutErrors.vue'
import ThankYouModal from '../../components/Modals/ThankYouModal/ThankYouModal.vue'
import userApiMixin from '../../mixins/userApiMixin'

export default {
  components: { Summary, OrderForm, CheckoutErrors, ThankYouModal },
  mixins: [userApiMixin],

  async beforeRouteLeave(to, from, next) {
    if (this.purchased) {
      await this.removeAllCartItems()

      this.purchased = false
      this.isOpen = false
    }
    next()
  },

  asyncData(context) {
    // Fetch by UUID
    // .get(`cdn/stories/cc4ebb9e-398d-4748-96e5-3e4700166333?find_by=uuid`, {})
    if (process.env.NODE_ENV === 'development' || process.server) {
      if (context.store.getters['products/getAllProducts'].length) return

      // Load the JSON from the API
      const url = `cdn/stories/`
      return context.app.$storyapi
        .get(url, {
          starts_with: 'products/',
          version: 'draft',
        })
        .then((res) => {
          context.store.commit('products/setAllProducts', res.data.stories)
          return res.data.stories
        })
        .catch((res) => {
          if (!res.response) {
            context.error({
              statusCode: 404,
              message: 'Failed to receive content form api',
            })
          } else {
            console.error(res.response.data)
            context.error({
              statusCode: res.response.status,
              message: res.response.data,
            })
          }
        })
    }
  },

  data: () => ({
    purchased: false,
    isOpen: false,
  }),

  head: {
    title: 'Checkout',
  },

  meta: {
    hideLayout: true,
    routeName: 'checkout',
  },

  methods: {
    ...mapActions({
      saveUser: 'user/saveUser',
      removeAllCartItems: 'cart/removeAllCartItems',
    }),
    async onContinueAndPay() {
      try {
        const newCart = this.cart.map((obj) => ({
          productId: obj._uid,
          quantity: obj.quantity,
        }))
        await this.postPurchase({
          date: new Date().toJSON(),
          cart: newCart,
        })

        this.purchased = true
        this.isOpen = true
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>
