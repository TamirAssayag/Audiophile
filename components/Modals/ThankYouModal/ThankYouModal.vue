<template>
  <v-dialog
    v-if="$route.name === 'checkout'"
    v-model="showPopup"
    persistent
    content-class="thankyou"
  >
    <div class="thankyou__header">
      <CheckMark />
      <div class="thankyou__header--title">
        <h2 class="text--uppercase">Thank you</h2>
        <h2 class="text--uppercase">for your order</h2>
      </div>
      <p class="text--gray">You will receive an email confirmation shortly.</p>
    </div>
    <div class="thankyou__cart">
      <div class="thankyou__cart--fhalf">
        <div v-if="!isShowMore" class="cart-modal__items">
          <div class="cart-modal__list-item">
            <div class="cart-modal__list-item__wrapper">
              <img width="64" :src="getImageUrl(cart[0].image)" alt="Item" />
              <div class="cart-modal__list-item__details">
                <div class="title--uppercase text--bold">
                  {{ cart[0].name }}
                </div>
                <p class="text--bold text--half-opacity">
                  $ {{ parseInt(cart[0].price).toLocaleString() }}
                </p>
              </div>
            </div>
            <div class="card-modal__quantity">
              <p class="text--gray text--bold">x{{ cart[0].quantity }}</p>
            </div>
          </div>
        </div>

        <div
          v-for="item in cart.slice(0, 3)"
          :key="item.image"
          class="cart-modal__items"
        >
          <div v-show="isShowMore" class="cart-modal__list-item">
            <div class="cart-modal__list-item__wrapper">
              <img width="64" :src="getImageUrl(item.image)" alt="Item" />
              <div class="item-modal__list-item__details">
                <div class="title--uppercase text--bold">
                  {{ item.name }}
                </div>
                <p class="text--bold text--half-opacity">
                  $ {{ parseInt(item.price).toLocaleString() }}
                </p>
              </div>
            </div>
            <div class="card-modal__quantity">
              <p class="text--gray text--bold">x{{ item.quantity }}</p>
            </div>
          </div>
        </div>

        <section v-if="cart.length > 1" class="thankyou__showmore">
          <hr class="mt-3" />
          <p
            class="text--bold text--gray text--center text--xsm mt-3"
            style="cursor: pointer"
            @click="showMoreItems"
          >
            {{ drawShowMoreText }}
          </p>
        </section>
      </div>
      <div class="thankyou__cart--total">
        <div class="thankyou__cart--total--text"></div>
        <span class="text--uppercase text--gray">Grand Total</span>
        <p class="text--bold text--white">
          $ {{ grandTotal.toLocaleString() }}
        </p>
      </div>
    </div>

    <v-btn
      class="btn btn--orange"
      style="width: 100% !important; margin-top: 23px"
      elevation="0"
      @click="toOrders"
      >Back To Home</v-btn
    >
  </v-dialog>
</template>

<script>
import './ThankYouModal.scss'
import { mapGetters, mapActions } from 'vuex'
import cartHelpers from '~/mixins/cartHelpers'
import CheckMark from '~/static/images/checkmark.svg?inline'
import userApiMixin from '~/mixins/userApiMixin'
export default {
  components: { CheckMark },

  mixins: [cartHelpers, userApiMixin],

  props: {
    isOpen: Boolean,
  },

  data: () => ({
    isShowMore: false,
  }),

  computed: {
    ...mapGetters({
      allOrders: 'user/getAllUserOrders',
    }),
    showPopup: {
      get() {
        return this.isOpen
      },
      set(isOpen) {
        this.$emit('onClose', isOpen)
      },
    },
    drawShowMoreText() {
      if (this.isShowMore) {
        if (this.cart.length > 3) {
          return `View less (${this.cart.length - 3} more item(s)) `
        } else {
          return `View less`
        }
      } else {
        return `and ${this.cart.length - 1} more item(s)`
      }
    },
  },

  methods: {
    ...mapActions({
      saveUser: 'user/saveUser',
    }),
    async toOrders() {
      try {
        const userResponse = await this.getUserData()
        this.saveUser(userResponse).then(() =>
          setTimeout(() => this.$router.push('/orders'))
        )
      } catch (err) {
        console.log(err)
      } finally {
        this.showPopup = false
      }
    },
    showMoreItems() {
      this.isShowMore = !this.isShowMore
    },
  },
}
</script>
