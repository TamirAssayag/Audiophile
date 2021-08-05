he
<template>
  <div class="cart-modal">
    <v-overlay v-model="showPopup" z-index="1" />
    <v-menu
      v-model="showPopup"
      max-width="327px"
      min-width="327px"
      :close-on-content-click="false"
      z-index="998"
      nudge-bottom="104"
      attach
      :menu-props="{
        top: false,
        offsetY: true,
      }"
    >
      <div class="cart-modal__container">
        <div class="cart-modal__header">
          <h1 class="title--uppercase">Cart ({{ getTotalCartItems }})</h1>
          <span v-if="cart.length" @click="$emit('onDelete')">Remove all</span>
        </div>
        <v-slide-y-transition v-if="cart.length" group appear>
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
                <QuantityToggle
                  :quantity="quantityControl(item.quantity)"
                  @increment="
                    incrementQuantity({
                      _uid: item._uid,
                    })
                  "
                  @decrement="$emit('onDecrement', item._uid)"
                />
              </div>
            </div>
          </div>
        </v-slide-y-transition>
        <v-slide-y-transition v-else appear>
          <p class="mt-2 text--half-opacity">Empty Cart...</p>
        </v-slide-y-transition>
      </div>
      <v-slide-y-transition v-if="cart.length" appear>
        <div class="cart-modal__down">
          <div
            class="cart-modal__total d-flex justify-space-between align-center"
          >
            <h4 class="text--half-opacity title--uppercase">Total</h4>
            <h3 class="cart-modal__price">
              $ {{ grandTotal.toLocaleString() }}
            </h3>
          </div>
          <v-btn class="btn btn--orange" width="100%" elevation="0"
            >Checkout</v-btn
          >
        </div>
      </v-slide-y-transition>
    </v-menu>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import QuantityToggle from '../../Layout/UI/QuantityToggle.vue'
export default {
  name: 'CartModal',
  components: { QuantityToggle },
  props: {
    isOpen: Boolean,
  },

  data: () => ({
    enabled: true,
    quantity: 1,
  }),

  computed: {
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
    ...mapActions({
      incrementQuantity: 'products/incrementQuantity',
    }),
    itemClick(e) {
      console.log(e, 'item click')
    },
    quantityControl(quantity) {
      if (typeof quantity === 'number') return quantity.toString()
    },
  },
}
</script>

<style lang="scss">
.cart-modal {
  &__container {
    min-height: 340px;
    background-color: $bg;
    padding: 1.5rem;

    .quantity-toggle {
      display: flex;
      align-items: center;
      justify-content: center;

      input {
        border: 0;
        text-align: center;
        padding: 0 0.5rem;
        background-color: #f1f1f1;
        font-weight: bold;
        outline: none;
        height: 32px;
        width: calc(20px - 0.89px);
        padding: 0 !important;
        align-self: center;
      }

      button {
        padding: 0 1rem;
        background: #f1f1f1;
        color: rgb(163, 163, 163);
        font-size: 1rem;
        cursor: pointer;
        font-size: 13px;
        font-weight: bold;
        height: 32px;
      }
    }
  }

  &__list-item {
    margin-top: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin: 1.5rem 0;

    &__wrapper {
      display: flex;
      align-items: center;
      gap: 1rem;

      img {
        border-radius: 8px;
      }
    }
  }

  &__header {
    display: flex;
    justify-content: space-between;
    h1 {
      font-size: 18px;
      font-weight: bold;
    }

    span {
      text-decoration: underline;
      font-size: 15px;
      line-height: 1.67;
      opacity: 0.5;
      transition: opacity 0.2s ease;
      cursor: pointer;

      &:hover {
        opacity: 1;
      }
    }
  }

  &__down {
    background-color: $bg;
    padding: 1.5rem;
    .v-btn {
      margin-top: 1.5rem;
      width: 100% !important;
    }
  }
}
</style>
