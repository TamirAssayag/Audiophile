<template>
  <main>
    <GoBack />
    <div class="checkout">
      <div class="checkout__form">
        <div class="checkout__header mb-8">
          <h1 class="title--uppercase">Checkout</h1>
        </div>
        <form @submit.prevent="nothingYet">
          <div class="checkout__form--billing">
            <p class="subtitle--orange text--bold title--uppercase mb-4">
              Billing Details
            </p>
            <label class="text--bold" for="name">Name</label>
            <v-text-field
              id="name"
              class="mt-2 mb-6"
              hide-details="true"
              outlined
              type="text"
              :value="getUser.name"
            />

            <label class="text--bold" for="email">Email Address</label>
            <v-text-field
              id="email"
              class="mt-2 mb-6"
              hide-details="true"
              outlined
              type="email"
            />

            <label class="text--bold" for="phone">Phone Number</label>
            <v-text-field
              id="phone"
              hide-details="true"
              class="mt-2 mb-6"
              outlined
              type="tel"
              pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
            />
          </div>
          <div class="checkout__form--shipping">
            <p class="subtitle--orange text--bold title--uppercase mb-4">
              Shipping Info
            </p>
            <label class="text--bold" for="address">Your Address</label>
            <v-text-field
              id="address"
              class="mt-2 mb-6"
              hide-details="true"
              outlined
              type="text"
            />

            <label class="text--bold" for="zip">ZIP Code</label>
            <v-text-field
              id="zip"
              class="mt-2 mb-6"
              hide-details="true"
              outlined
              type="text"
            />

            <label class="text--bold" for="city">City</label>
            <v-text-field
              id="city"
              hide-details="true"
              class="mt-2 mb-6"
              outlined
              type="text"
            />

            <label class="text--bold" for="country">Country</label>
            <v-text-field
              id="country"
              hide-details="true"
              class="mt-2 mb-6"
              outlined
              type="text"
            />
          </div>
          <div class="checkout__form--payment">
            <p class="subtitle--orange text--bold title--uppercase mb-4">
              Payment Details
            </p>
            <label class="text--bold">Payment Method</label>
            <v-radio-group v-model="radio">
              <v-radio
                label="e-Money"
                value="emoney"
                class="mt-3 mb-6"
                hide-details="true"
              />
              <v-radio
                label="Cash on Delivery"
                value="cashondelivery"
                class="mt-2 mb-6"
                hide-details="true"
              />
            </v-radio-group>
            <label class="text--bold" for="emoney-num">e-Money Number</label>
            <v-text-field
              id="emoney-num"
              class="mt-2 mb-6"
              hide-details="true"
              outlined
              type="number"
              pattern="[0-9]*"
            />

            <label class="text--bold" for="emoney-pin">e-Money PIN</label>
            <v-text-field
              id="emoney-pin"
              hide-details="true"
              class="mt-2 mb-6"
              outlined
              type="number"
              pattern="[0-9]*"
            />
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
import './OrderForm.scss'
import GoBack from '~/components/Layout/UI/GoBack.vue'
export default {
  name: 'Checkout',
  components: { GoBack },
  data: () => ({
    radio: '',
  }),
}
</script>

<style lang="scss"></style>
