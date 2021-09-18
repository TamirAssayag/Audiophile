<template>
  <main>
    <div class="checkout__wrapper">
      <div class="checkout">
        <div class="checkout__form">
          <div class="checkout__header mb-8">
            <h1 class="title--uppercase">Checkout</h1>
          </div>
          <form @submit.prevent="nothingYet">
            <section>
              <p class="subtitle--orange text--bold title--uppercase mb-4">
                Billing Details
              </p>
              <div class="checkout__form--billing">
                <div class="billing">
                  <label class="text--bold" for="name">Name</label>
                  <v-text-field
                    id="name"
                    v-model="checkoutForm.name"
                    class="mt-2 mb-6"
                    outlined
                    color="#d87d4a"
                    required
                    type="text"
                    :error-messages="nameErrors"
                    @focus="reset('checkoutForm.name')"
                    @blur="touch('checkoutForm.name')"
                  />
                </div>

                <div class="billing">
                  <label class="text--bold" for="email">Email Address</label>
                  <v-text-field
                    id="email"
                    v-model="checkoutForm.email"
                    class="mt-2 mb-6"
                    outlined
                    color="#d87d4a"
                    type="email"
                    :error-messages="emailErrors"
                    @focus="reset('checkoutForm.email')"
                    @blur="touch('checkoutForm.email')"
                  />
                </div>
              </div>
              <div class="billing">
                <label class="text--bold" for="phone">Phone Number</label>
                <v-text-field
                  id="phone"
                  v-model="checkoutForm.phone"
                  class="mt-2 mb-6"
                  outlined
                  color="#d87d4a"
                  type="tel"
                  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                  :error-messages="phoneErrors"
                  @focus="reset('checkoutForm.phone')"
                  @blur="touch('checkoutForm.phone')"
                />
              </div>
            </section>
            <section class="checkout__form--shipping">
              <p class="subtitle--orange text--bold title--uppercase mb-4">
                Shipping Info
              </p>
              <div>
                <label class="text--bold" for="address">Your Address</label>
                <v-text-field
                  id="address"
                  v-model="checkoutForm.clientAddress"
                  class="mt-2 mb-6"
                  outlined
                  color="#d87d4a"
                  type="text"
                  :error-messages="clientAddressErrors"
                  @focus="reset('checkoutForm.clientAddress')"
                  @blur="touch('checkoutForm.clientAddress')"
                />
              </div>
              <div class="checkout__form--shipping__wrapper">
                <div class="shipping">
                  <label class="text--bold" for="zip">ZIP Code</label>
                  <v-text-field
                    id="zip"
                    v-model="checkoutForm.clientZipCode"
                    class="mt-2 mb-6"
                    outlined
                    color="#d87d4a"
                    type="text"
                    :error-messages="clientZipCodeErrors"
                    @focus="reset('checkoutForm.clientZipCode')"
                    @blur="touch('checkoutForm.clientZipCode')"
                  />
                </div>

                <div class="shipping">
                  <label class="text--bold" for="city">City</label>
                  <v-text-field
                    id="city"
                    v-model="checkoutForm.clientCity"
                    class="mt-2 mb-6"
                    outlined
                    color="#d87d4a"
                    type="text"
                    :error-messages="clientCityErrors"
                    @focus="reset('checkoutForm.clientCity')"
                    @blur="touch('checkoutForm.clientCity')"
                  />
                </div>
              </div>
              <div class="shipping">
                <label class="text--bold" for="country">Country</label>
                <v-text-field
                  id="country"
                  v-model="checkoutForm.clientCountry"
                  class="mt-2 mb-6"
                  outlined
                  color="#d87d4a"
                  type="text"
                  :error-messages="clientCountryErrors"
                  @focus="reset('checkoutForm.clientCountry')"
                  @blur="touch('checkoutForm.clientCountry')"
                />
              </div>
            </section>

            <section style="margin-top: 2.5rem">
              <p class="subtitle--orange text--bold title--uppercase mb-4">
                Payment Details
              </p>
              <div class="checkout__form--payment">
                <div class="checkout__form--payment--title">
                  <label class="text--bold">Payment Method</label>
                </div>

                <div class="checkout__form--payment__wrapper">
                  <v-radio-group
                    v-for="method in paymentMethods"
                    :key="method.text"
                    v-model="checkoutForm.radioGroup"
                  >
                    <!-- :error-messages="radioGroupErrors"
                    @focus="reset('checkoutForm.radioGroup')"
                    @blur="touch('checkoutForm.radioGroup')" -->
                    <v-radio
                      :label="method.text"
                      :value="method.value"
                      :class="method._class"
                    />
                  </v-radio-group>
                </div>
              </div>
            </section>

            <v-expand-transition
              v-if="checkoutForm.radioGroup === 'emoney'"
              appear
              group
            >
              <section class="e-money">
                <div class="emoney">
                  <label class="text--bold" for="emoney-num"
                    >e-Money Number</label
                  >
                  <v-text-field
                    v-if="checkoutForm.radioGroup === 'emoney'"
                    id="emoney-num"
                    v-model="checkoutForm.eMoneyNumber"
                    class="mt-2 mb-6"
                    outlined
                    type="number"
                    pattern="[0-9]*"
                    color="#d87d4a"
                  />
                </div>

                <div class="emoney">
                  <label class="text--bold" for="emoney-pin">e-Money PIN</label>
                  <v-text-field
                    id="emoney-pin"
                    v-model="checkoutForm.eMoneyPin"
                    class="mt-2 mb-6"
                    outlined
                    type="number"
                    pattern="[0-9]*"
                    color="#d87d4a"
                  />
                </div>
              </section>
            </v-expand-transition>
            <v-expand-transition
              v-if="checkoutForm.radioGroup === 'cash-on-delivery'"
              appear
              group
              mode="out-in"
            >
              <div class="checkout__cash-on-delivery">
                <div class="checkout__cash-on-delivery--img">
                  <CashOnDelivery />
                </div>
                <p class="text--gray text--md">
                  The ‘Cash on Delivery’ option enables you to pay in cash when
                  our delivery courier arrives at your residence. Just make sure
                  your address is correct so that your order will not be
                  cancelled.
                </p>
              </div>
            </v-expand-transition>
          </form>
        </div>
      </div>
      <Summary>
        <template #total>
          <div class="cart-modal__down">
            <div
              class="
                cart-modal__total
                d-flex
                justify-space-between
                align-center
              "
            >
              <h4 class="text--half-opacity title--uppercase">Total</h4>
              <h3 class="cart-modal__price">$ {{ total.toLocaleString() }}</h3>
            </div>
            <div
              class="
                cart-modal__total
                d-flex
                justify-space-between
                align-center
              "
            >
              <h4 class="text--half-opacity title--uppercase">Shipping</h4>
              <h3 class="cart-modal__price">$ {{ shipping }}</h3>
            </div>
            <div
              class="
                cart-modal__total
                d-flex
                justify-space-between
                align-center
              "
            >
              <h4 class="text--half-opacity title--uppercase">
                VAT (INCLUDED)
              </h4>
              <h3 class="cart-modal__price">
                $ {{ vatCalc.toLocaleString() }}
              </h3>
            </div>
            <div
              class="
                cart-modal__total
                d-flex
                justify-space-between
                align-center
                mt-5
              "
            >
              <h4 class="text--half-opacity title--uppercase">Grand Total</h4>
              <h3 class="cart-modal__price text--orange">
                $ {{ calcGrandTotal }}
              </h3>
            </div>
            <v-btn
              class="btn btn--orange"
              width="100%"
              elevation="0"
              title="Continue & Pay"
              aria-label="Continue & Pay"
              @click="onContinueAndPay"
              >Continue & Pay</v-btn
            >
          </div>
        </template>
      </Summary>
    </div>
  </main>
</template>

<script>
import './OrderForm.scss'

import get from 'lodash/get'
import Summary from '../Summary.vue'
import validations from '~/mixins/validations'
import userApiMixin from '~/mixins/api/userApiMixin'
import CashOnDelivery from '~/static/images/cash-on-delivery.svg?inline'
export default {
  name: 'Checkout',
  components: { CashOnDelivery, Summary },
  mixins: [validations, userApiMixin],

  data: () => ({
    isOpen: false,
    purchased: false,
    paymentMethods: [
      {
        text: 'e-Money',
        value: 'emoney',
        _class: 'mt-3 mb-3',
      },
      {
        text: 'Cash On Delivery',
        value: 'cash-on-delivery',
        _class: 'mt-2 mb-8',
      },
    ],
  }),

  methods: {
    async onContinueAndPay() {
      if (this.checkoutForm.radioGroup === 'e-money') {
        if (
          this.checkoutForm.eMoneyNumber === null ||
          this.checkoutForm.eMoneyPin === null
        ) {
          this.$root.$emit('snackbar', {
            text: 'Please fill up your e-Money details',
          })
        }
      }

      this.$v.$touch()
      if (this.$v.$invalid) {
        this.$root.$emit('snackbar', { text: 'All fields must be added' })
      } else if (this.$v.checkoutForm.radioGroup.$invalid) {
        this.$root.$emit('snackbar', {
          text: 'Please select on payment method',
        })
      } else {
        try {
          const newCart = this.cart.map((obj) => ({
            productId: obj._uid,
            quantity: obj.quantity,
          }))
          await this.postPurchase({
            date: new Date().toJSON(),
            cart: newCart,
          })
          this.$nuxt.$emit('openModal')
          this.purchased = true
        } catch (err) {
          console.log(err)
        }
      }
    },

    reset(path) {
      return get(this.$v, path).$reset()
    },
    touch(path) {
      return get(this.$v, path).$touch()
    },
  },
}
</script>

<style lang="scss"></style>
