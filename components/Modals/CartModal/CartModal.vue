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
          <h1 class="title--uppercase">Cart (3)</h1>
          <span>Remove all</span>
        </div>
        <div class="cart-modal__items">
          <div class="cart-modal__items__container">
            <v-img
              width="64"
              :src="
                getImageUrl('shared/desktop/image-xx99-mark-two-headphones.jpg')
              "
              alt="Item"
            />
            <div class="cart-modal__items__details">
              <div class="title--uppercase text--bold">XX99 MK II</div>
              <p class="text--bold text--half-opacity">$ 2,999</p>
            </div>
            <div class="card-modal__quantity">
              <QuantityToggle />
            </div>
          </div>
        </div>
      </div>
      <div class="cart-modal__down">
        <div
          class="cart-modal__total d-flex justify-space-between align-center"
        >
          <h4 class="text--half-opacity title--uppercase">Total</h4>
          <h3 class="cart-modal__price">$ 2,999</h3>
        </div>
        <v-btn class="btn btn--orange" width="100%" elevation="0"
          >Checkout</v-btn
        >
      </div>
    </v-menu>
  </div>
</template>

<script>
import QuantityToggle from '../../Layout/UI/QuantityToggle.vue'
export default {
  components: { QuantityToggle },
  props: {
    isOpen: Boolean,
  },
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

  &__items {
    margin-top: 0.5rem;

    &__container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      margin: 1.5rem 0;
    }

    .v-image {
      border-radius: 8px;
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
