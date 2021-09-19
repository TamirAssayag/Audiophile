<template>
  <div class="product">
    <div class="single--product">
      <div class="product__container">
        <div class="product__wrapper">
          <div class="product__image">
            <NuxtImg
              :key="$screen.tablet + productImageSettings.width"
              provider="storyblok"
              :src="data.content.image"
              :title="data.content.title"
              :alt="data.content.title"
              :width="productImageSettings.width"
              :height="productImageSettings.height"
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
              <!-- prettier-ignore -->
              <p>
                ${{ data.content.price ? parseInt(data.content.price).toLocaleString(): 0 }}
              </p>
            </div>
            <div class="product__button">
              <div class="product__button__container">
                <QuantityToggle
                  :quantity="quantity.toString()"
                  @increment="incrementQuantity()"
                  @decrement="decrementQuantity()"
                />
                <v-btn
                  class="btn btn--orange"
                  elevation="0"
                  aria-label="Add To Cart"
                  title="Add to Cart"
                  @click="addToCart"
                >
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
              <div class="product__inthebox--wrapper">
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
            </template>
            <p v-else class="text--half-opacity">Items hasn't set yet...</p>
          </div>
        </div>
      </div>
      <div v-if="productImageLength()" class="product__images">
        <div class="product__images__wrapper">
          <div class="product__images__wrapper--left">
            <NuxtImg
              :src="data.content.product_images[0].image"
              alt="Product Image"
            />
            <NuxtImg
              :src="data.content.product_images[1].image"
              alt="Product Image"
            />
          </div>
          <div class="product__images__wrapper--right">
            <NuxtImg
              :src="data.content.product_images[2].image"
              alt="Product Image"
            />
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
import { mapActions, mapGetters } from 'vuex'
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

  data: () => ({
    quantity: 1,
  }),

  computed: {
    ...mapGetters({
      getCartProductById: 'cart/getCartProductById',
    }),
    productImageSettings() {
      if (this.$screen.desktop) {
        return {
          width: '540',
          height: '560',
        }
      } else if (this.$screen.tablet) {
        return {
          width: '281',
          height: '400',
        }
      } else {
        return {
          width: '327',
          height: '327',
        }
      }
    },
    getCartProduct() {
      return this.getCartProductById(this.data.content._uid)
    },
  },

  methods: {
    ...mapActions({
      addProductToCart: 'cart/addProductToCart',
    }),

    productImageLength() {
      return this.data.content?.product_images?.length
    },
    inTheBoxLength() {
      return this.data.content?.in_the_box?.length
    },
    addToCart() {
      this.addProductToCart({
        name: this.data.name,
        product: this.data.content,
        quantity: this.quantity,
        _uid: this.data.content._uid,
      })

      if (
        this.getCartProduct?.quantity >= 1 &&
        this.getCartProduct?.quantity <= 1
      ) {
        this.$root.$emit('snackbar', {
          text: `Added ${this.data.name} to cart`,
        })
      } else if (
        this.getCartProduct?.quantity < 20 &&
        this.getCartProduct?.quantity >= 2
      ) {
        this.$root.$emit('snackbar', {
          text: `Updated  ${this.data.name} in Cart`,
        })
      } else if (this.getCartProduct?.quantity >= 20) {
        return this.$root.$emit('snackbar', {
          text: `Cart cannot be updated at this moment`,
        })
      }
      if (this.getTotalCartItems >= 99) {
        return this.$root.$emit('snackbar', {
          text: "Can't update cart due to a limit of 99 items",
        })
      }
      this.quantity = 1
    },
  },
}
</script>

<style lang="scss">
.single--product {
  .product {
    &__container {
      @include media('>=lg') {
        padding: 0;
        display: grid;
        place-items: center;
      }
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
      background-color: $gray;
      font-weight: bold;
      outline: none;
    }

    button {
      padding: 1rem;
      background: $gray;
      color: rgb(163, 163, 163);
      font-size: 1rem;
      cursor: pointer;
      font-size: 13px;
      font-weight: bold;
      transition: color 0.2s ease;

      &:hover,
      &:active {
        color: $orange;
      }
    }
  }
}
</style>
