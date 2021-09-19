<template>
  <client-only>
    <section v-if="loggedIn && cart.length" class="container">
      <GoBack />
      <OrderForm />
      <ThankYouModal :is-open="isOpen" @onClose="isOpen = false" />
    </section>
    <section v-else>
      <CheckoutErrors />
    </section>
  </client-only>
</template>

<script>
import { mapActions } from 'vuex'
import OrderForm from '~/components/Order/OrderForm/OrderForm.vue'
import CheckoutErrors from '~/components/Order/CheckoutErrors.vue'
import ThankYouModal from '~/components/Modals/ThankYouModal/ThankYouModal.vue'
import GoBack from '~/components/Layout/UI/GoBack.vue'
export default {
  components: { OrderForm, CheckoutErrors, ThankYouModal, GoBack },
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
  mounted() {
    this.$nuxt.$on('openModal', this.openModal)
  },

  destroyed() {
    if (this.isOpen) {
      this.isOpen = false
    }
    this.$nuxt.$off('openModal', this.openModal)
  },

  methods: {
    ...mapActions({
      saveUser: 'user/saveUser',
      removeAllCartItems: 'cart/removeAllCartItems',
    }),
    openModal() {
      this.isOpen = true
      this.purchased = true
    },
  },
}
</script>

<style lang="scss">
@include media('>=lg') {
  .checkout {
    &__wrapper {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
