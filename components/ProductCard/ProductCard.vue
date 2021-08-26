<template>
  <div v-editable="data.content" class="product product--card">
    <div class="product--card__container">
      <div class="product--cart__side">
        <div class="product__image">
          <NuxtImg
            :key="$screen.tablet"
            provider="storyblok"
            :src="data.content.image"
            :title="data.content.title"
            :alt="data.content.title"
          />
        </div>
      </div>
      <div class="product--cart__side-two">
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
          <p>
            {{ data.content.description }}
          </p>
        </div>
        <div class="product__button">
          <NuxtLink :to="$route.path + '/' + data.slug">
            <v-btn class="btn btn--orange" elevation="0"> See Product </v-btn>
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
  min-height: 700px;
  margin-bottom: 6rem;
  &__container {
    text-align: center;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  @include media('>=lg') {
    &__container {
      width: 1110px;
      margin: auto;
      flex-direction: row;
      justify-content: center;
      gap: 7.8rem;
    }

    .product {
      &__header {
        text-align: left;
      }
      &__description {
        text-align: left;
      }
      &__button {
        text-align: left;
      }
    }
  }
}
</style>
