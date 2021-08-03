<template>
  <div class="product">
    <div class="single--product">
      <div class="product__container">
        <div class="product__wrapper">
          <div class="product__image">
            <v-img
              :src="data.content.image"
              :title="data.content.title"
              :alt="data.content.title"
            />
          </div>
          <div class="product__wrapper__content">
            <div class="product__header">
              <span
                v-if="data.content.is_new_product"
                class="product__header__subtitle subtitle subtitle--orange"
                >NEW PRODUCT</span
              >
              <div class="product__header__title">
                <h1 class="title--uppercase">
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
              <p>
                $
                {{
                  data.content.price
                    ? parseInt(data.content.price).toLocaleString()
                    : 'Free'
                }}
              </p>
            </div>
            <div class="product__button">
              <div class="product__button__container">
                <QuantityToggle />
                <v-btn class="btn btn--orange" elevation="0">
                  Add to cart
                </v-btn>
              </div>
            </div>
          </div>
        </div>
        <div class="product__content--wrapper">
          <div class="product__features">
            <h1 class="title--uppercase product__features--title">Features</h1>
            <div
              v-if="data.content.features"
              class="product__features__content"
            >
              <rich-text-renderer :document="data.content.features || {}" />
            </div>
            <p v-else>
              There are currently no features for the current product...
            </p>
          </div>

          <div class="product__inthebox">
            <h1 class="title--uppercase">In The Box</h1>
            <template v-if="inTheBoxLength()">
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
            </template>
            <p v-else class="text--half-opacity">Items hasn't set yet...</p>
          </div>
        </div>
      </div>
      <div v-if="productImageLength()" class="product__images">
        <div class="product__images__image">
          <v-img :src="data.content.product_images[0].image" />
          <v-img :src="data.content.product_images[1].image" />
        </div>
        <div class="product__images__image_aside">
          <v-img :src="data.content.product_images[2].image" />
        </div>
      </div>
      <h1 class="title--uppercase text--center product__mayalsolike--title">
        You May Also Like
      </h1>
    </div>
  </div>
</template>

<script>
import QuantityToggle from '../Layout/UI/QuantityToggle.vue'
import './../Product/Product.scss'
export default {
  name: 'Product',
  components: { QuantityToggle },
  props: {
    data: {
      type: null,
      default: '',
    },
  },

  methods: {
    productImageLength() {
      return this.data.content?.product_images?.length
    },
    inTheBoxLength() {
      return this.data.content?.in_the_box?.length
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

  .quantity-toggle {
    display: flex;
    height: 48px;

    input {
      border: 0;
      width: calc(2.5rem + 3.1px);
      text-align: center;
      padding: 0 0.5rem;
      background-color: #f1f1f1;
      font-weight: bold;
      outline: none;
    }

    button {
      padding: 1rem;
      background: #f1f1f1;
      color: rgb(163, 163, 163);
      font-size: 1rem;
      cursor: pointer;
      font-size: 13px;
      font-weight: bold;
    }
  }
}
</style>
