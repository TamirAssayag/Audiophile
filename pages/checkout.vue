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
import { mapGetters, mapActions } from 'vuex'
import Summary from '../components/Order/Summary.vue'
import OrderForm from '../components/Order/OrderForm/OrderForm.vue'
import CheckoutErrors from '../components/Order/CheckoutErrors.vue'
import ThankYouModal from '../components/Modals/ThankYouModal/ThankYouModal.vue'
import userApiMixin from './../mixins/userApiMixin'

export default {
  components: { Summary, OrderForm, CheckoutErrors, ThankYouModal },
  mixins: [userApiMixin],
  middleware: ['hasCartItems'],

  asyncData(context) {
    // Fetch by UUID
    // .get(`cdn/stories/cc4ebb9e-398d-4748-96e5-3e4700166333?find_by=uuid`, {})
    if (process.env.NODE_ENV === 'development' || process.server) {
      // Load the JSON from the API
      const url = `cdn/stories/`
      return context.app.$storyapi
        .get(url, {
          starts_with: 'products/',
          version: 'draft',
        })
        .then((res) => {
          return res.data
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
    isOpen: false,
  }),

  async fetch(context) {
    if (process.env.NODE_ENV === 'development' || process.server) {
      const products = await context.app.$storyapi.get(`cdn/stories/`, {
        starts_with: 'products/',
        version: 'draft',
      })
      context.store.commit('products/setAllProducts', products.data.stories)
    }
  },

  computed: {
    ...mapGetters({
      getLastOrder: 'user/getLastOrder',
    }),
  },

  methods: {
    ...mapActions({
      saveUser: 'user/saveUser',
    }),
    async onContinueAndPay() {
      const newCart = this.cart.map((obj) => ({
        productId: obj._uid,
        quantity: obj.quantity,
      }))
      await this.postPurchase({
        date: new Date().toJSON(),
        cart: newCart,
      })
      this.saveUser(await this.getUserData())
      this.isOpen = true
    },
  },
}
</script>
