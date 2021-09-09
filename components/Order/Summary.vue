<template>
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
            class="cart-modal__total d-flex justify-space-between align-center"
          >
            <h4 class="text--half-opacity title--uppercase">Grand Total</h4>
            <h3 class="cart-modal__price text--orange">
              $ {{ grandTotal.toLocaleString() }}
            </h3>
          </div>
          <v-btn
            class="btn btn--orange"
            width="100%"
            elevation="0"
            @click="$emit('onPay')"
            >Continue & Pay</v-btn
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
