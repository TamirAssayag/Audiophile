<template>
  <div v-editable="data.content" class="product product--card">
    <div class="product--card__container">
      <div class="product__image">
        <v-img
          :src="data.content.image"
          :alt="data.content.title"
          :title="data.content.title"
        />
      </div>
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
  margin-bottom: 7.5rem;
  &__container {
    text-align: center;
    padding: 1.5rem;
  }
}
</style>
