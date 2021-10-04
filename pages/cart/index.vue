<template>
  <main class="cart">
    <client-only>
      <v-expand-transition appear>
        <div v-if="cart.length" class="cart-modal">
          <div class="cart-modal__container">
            <div
              v-for="cartItem in cart"
              :key="cartItem.name"
              class="cart-modal__list-item__wrapper"
            >
              <img width="64" :src="getImageUrl(cartItem.image)" alt="Item" />
              <div class="cart-modal__list-item__details">
                <div class="title--uppercase text--bold">
                  {{ cartItem.name }}
                </div>
                <p class="text--bold text--half-opacity">
                  $ {{ parseInt(cartItem.price).toLocaleString() }}
                </p>
              </div>
              <div class="cart-modal__quantity">
                <QuantityToggle
                  :quantity="quantityControl(cartItem.quantity)"
                  @increment="onIncremenet(cartItem)"
                  @decrement="onDecrement(cartItem)"
                />
              </div>
            </div>
          </div>
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
              <h3 class="cart-modal__price">
                $ {{ grandTotal.toLocaleString() }}
              </h3>
            </div>
            <NuxtLink
              to="/checkout"
              class="v-btn btn btn--orange"
              width="100%"
              elevation="0"
              title="Checkout"
              aria-label="Checkout"
              >Checkout >
            </NuxtLink>
          </div>
        </div>
      </v-expand-transition>
    </client-only>
  </main>
</template>

<script>
import QuantityToggle from '../../components/Layout/UI/QuantityToggle.vue'
import cartHelpers from '~/mixins/cartHelpers'
export default {
  components: { QuantityToggle },
  mixins: [cartHelpers],
  head: {
    title: 'Cart',
  },
  meta: {
    hideAbout: true,
    hasPageHeader: true,
    routeName: 'cart',
  },
}
</script>

<style lang="scss">
.cart {
  .cart-modal {
    width: 100%;
    max-width: $lg-width;
    margin: auto auto 10rem;
    &__list-item__wrapper {
      width: 100%;
      padding: 1rem;
      background-color: white;
      &:nth-child(even) {
        background-color: #f3f3f3;
      }
    }
    &__quantity {
      margin-left: auto;
    }
    &__container {
      padding: 0;
      min-height: unset !important;
    }
  }
}

.min-height--40 {
  min-height: 40vh;
}
</style>
