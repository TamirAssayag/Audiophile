<template>
  <div class="product">
    <div class="single--product">
      <div class="product__container">
        <div class="product__image">
          <v-img
            :src="data.content.image"
            :title="data.content.title"
            :alt="data.content.title"
          />
        </div>
        <div class="product__header">
          <span
            v-if="data.content.is_new_product"
            class="product__header__subtitle subtitle subtitle--orange"
            >NEW PRODUCT</span
          >
          <div class="product__header__title">
            <h1 class="text--uppercase">
              {{ data.content.title }}
            </h1>
          </div>
        </div>
        <div class="product__description">
          <p>
            {{ data.content.description }}
          </p>
        </div>
        <div class="product__price">
          <p>$ {{ parseInt(data.content.price).toLocaleString() }}</p>
        </div>
        <div class="product__button">
          <div class="product__button__container">
            <div class="quantity-toggle">
              <button @click="decrement()">-</button>
              <input
                type="number"
                :value="quantity"
                readonly
                pattern="[0-9]*"
              />
              <button @click="increment()">+</button>
            </div>
            <v-btn class="btn btn--orange" elevation="0"> Add to cart </v-btn>
          </div>
        </div>
        <div class="product__features">
          <h1 class="title--uppercase">Features</h1>
          <div class="product__features__content">
            <rich-text-renderer :document="data.content.features || {}" />
          </div>
        </div>
        <div class="product__inthebox">
          <h1 class="title--uppercase">In The Box</h1>
          <div
            v-for="item in data.content.in_the_box"
            :key="item._uid"
            class="product__inthebox--item"
          >
            <ul>
              <li>{{ item.amount }}x</li>
              <li>{{ item.text }}</li>
            </ul>
          </div>
        </div>
      </div>
      <h1 class="title--uppercase text--center product__mayalsolike--title">
        You May Also Like
      </h1>
    </div>
  </div>
</template>

<script>
import './../Product/Product.scss'
export default {
  name: 'Product',
  props: {
    data: {
      type: null,
      default: '',
    },
  },

  data: () => ({
    quantity: 1,
  }),

  methods: {
    increment() {
      this.quantity++
    },
    decrement() {
      if (this.quantity === 1) return
      this.quantity--
    },
  },
}
</script>

<style lang="scss">
.single--product {
  .product {
    &__container {
      padding: 0rem 1.5rem 1.5rem;
    }
  }
}
</style>
