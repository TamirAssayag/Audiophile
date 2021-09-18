<template>
  <div v-editable="data.content" class="product product--card">
    <div
      :class="[
        'product--card__container',
        { 'product--card--reverse': index % 2 === 0 },
      ]"
    >
      <div class="product--card__side">
        <div
          :class="[
            'product__image',
            { 'image--wrapper': !productCategoryRouteNames },
          ]"
        >
          <NuxtImg
            :key="$screen.tablet"
            provider="storyblok"
            :src="data.content.image"
            :title="data.content.title"
            :alt="data.content.title"
          />
        </div>
      </div>
      <div class="product--card__side-two">
        <div class="product__header">
          <span
            v-if="data.content.is_new_product"
            class="product__header__subtitle subtitle subtitle--orange"
            >NEW PRODUCT</span
          >
          <div class="product__header__title">
            <h1 class="title--uppercase">{{ data.content.title }}</h1>
          </div>
        </div>
        <div class="product__description">
          <span>
            {{ data.content.description }}
          </span>
        </div>
        <div class="product__button">
          <NuxtLink :to="$route.path + '/' + data.slug">
            <v-btn
              class="btn btn--orange"
              elevation="0"
              aria-label="See Product"
              title="See Product"
            >
              See Product
            </v-btn>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import './../Product/Product.scss'
export default {
  props: {
    data: {
      type: null,
      default: '',
    },
    index: {
      type: null,
      default: '',
    },
  },

  computed: {
    productCategoryRouteNames() {
      const routeNames = ['headphones', 'speakers', 'earphones']
      return routeNames.every((route) => this.$route.name === route)
    },
  },

  methods: {
    directToProduct() {
      this.$router.push(this.$route.path + '/' + this.data.slug)
    },
  },
}
</script>

<style lang="scss">
.product--card {
  margin-bottom: 10rem;
  &__container {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  @include media('>=lg') {
    max-width: $lg-width;

    &__container {
      text-align: left !important;
      width: 100%;
      margin: auto;
      flex-direction: row;
      justify-content: center;
      justify-content: space-between;
    }

    &--reverse {
      flex-direction: row-reverse;
    }

    &__side {
      @include media('>lg') {
        width: 50%;
      }
    }
    &__header {
      text-align: left;
    }
    &__description {
      width: 100%;
      margin: 0 !important;
      text-align: left;
    }
    &__button {
      text-align: left;
    }
  }
}
</style>
