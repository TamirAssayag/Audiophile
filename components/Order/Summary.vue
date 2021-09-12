<template>
  <div class="summary">
    <div class="summary__card">
      <div class="summary__header mb-8">
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
        <slot name="total" />
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
