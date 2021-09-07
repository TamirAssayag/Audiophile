<template>
  <section v-if="loggedIn && cart.length" class="container">
    <OrderForm />
    <div class="checkout">
      <div class="checkout__form mb-10">
        <div class="checkout__header mb-8">
          <h3 class="title--uppercase">Summary</h3>
        </div>
        <div v-for="item in cart" :key="item._uid" class="cart-modal__items">
          <div class="cart-modal__list-item">
            <div class="cart-modal__list-item__wrapper">
              <img width="64" :src="getImageUrl(item.image)" alt="Item" />
              <div class="cart-modal__list-item__details">
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
        <div class="cart-modal__checkout">
          <div class="cart-modal__down">
            <div
              class="
                cart-modal__total
                d-flex
                justify-space-between
                align-center
              "
            >
              <h4 class="text--half-opacity title--uppercase">Grand Total</h4>
              <h3 class="cart-modal__price text--orange">
                $ {{ grandTotal.toLocaleString() }}
              </h3>
            </div>
            <v-btn class="btn btn--orange" width="100%" elevation="0"
              >Continue & Pay</v-btn
            >
          </div>
        </div>
      </div>
    </div>
  </section>
  <section v-else>
    <PageHeader :title="'Can\'t proceed to checkout'" class="mb-0" />
    <div class="container">
      <div v-if="!loggedIn" class="checkout__cant-proceed">
        <span><strong>Dear Customer</strong>, our apologies,</span>
        <p class="mt-1 mb-4">
          If you have an account please
          <NuxtLink to="login">
            <strong class="text--underline">Login</strong></NuxtLink
          >
          to proceed your purchase,
        </p>
        <h3>
          Don't have an account?
          <NuxtLink to="signup">
            <strong class="text--underline">Sign Up</strong></NuxtLink
          >
          here
        </h3>
      </div>
      <div v-if="!cart.length" class="checkout__cant-proceed">
        <span
          ><strong>Dear {{ displayName }}</strong
          >,</span
        >
        <h3 class="mt-1 mb-4">Your cart is empty,</h3>
        <p class="text--gray">Please come back when it's not empty 😉</p>
      </div>
    </div>
  </section>
</template>

<script>
import PageHeader from '../components/Layout/UI/PageHeader.vue'
import OrderForm from '../components/OrderForm/OrderForm.vue'
export default {
  components: { OrderForm, PageHeader },
  middleware: ['hasCartItems'],
}
</script>
