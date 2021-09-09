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
        <div class="cart-modal__items">
          <div class="cart-modal__list-item">
            <div class="cart-modal__list-item__wrapper">
              <img
                width="64"
                :src="getImageUrl(getLastOrder[0].image)"
                alt="Item"
              />
              <div class="cart-modal__list-item__details">
                <div class="title--uppercase text--bold">
                  <v-clamp :autoresize="false" :max-lines="1">
                    {{ cart[0].name }}
                  </v-clamp>
                </div>
                <p class="text--bold text--half-opacity">
                  $ {{ parseInt(getLastOrder[0].price).toLocaleString() }}
                </p>
              </div>
            </div>
            <div class="card-modal__quantity">
              <p class="text--gray text--bold">
                x{{ getLastOrder[0].quantity }}
              </p>
            </div>
          </div>
        </div>

        <section v-if="getLastOrder.length > 1">
          <hr class="mt-3" />
          <p class="text--bold text--gray text--center text--xsm mt-3">
            and {{ getLastOrder.length - 1 }} more item(s)
          </p>
        </section>
      </div>
      <div class="thankyou__cart--total">
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
      @click="onBackHome"
      >Back To Home</v-btn
    >
  </v-dialog>
</template>

<script>
import './ThankYouModal.scss'
import { mapGetters } from 'vuex'
import cartHelpers from '~/mixins/cartHelpers'
import CheckMark from '~/static/images/checkmark.svg?inline'
export default {
  components: { CheckMark },
  mixins: [cartHelpers],

  props: {
    isOpen: Boolean,
  },
  computed: {
    ...mapGetters({
      getLastOrder: 'user/getLastOrder',
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
  },

  methods: {
    onBackHome() {
      this.$router.push('/')
      this.removeAllCartItems()
      this.showPopup = false
    },
  },
}
</script>

<style lang="scss"></style>
