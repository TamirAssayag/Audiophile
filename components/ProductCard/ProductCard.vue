<template>
  <div v-editable="data.content" class="product">
    <div class="product__container">
      <div class="product__image">
        <img :src="data.content.image" />
      </div>
      <div class="product__header">
        <span
          v-if="data.content.is_new_product"
          class="product__header__subtitle subtitle subtitle--orange"
          >NEW PRODUCT</span
        >
        <div class="product__header__title">{{ data.content.title }}</div>
      </div>
      <div class="product__description">
        <p>
          {{ data.content.description }}
        </p>
      </div>
      <div class="product__button">
        <v-btn class="btn btn--orange" elevation="0" @click="directToProduct">
          See Product
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
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
.product {
  min-height: 700px;
  margin-bottom: 7.5rem;
  &__container {
    text-align: center;
  }

  &__image {
    img {
      width: 327px;
      border-radius: 8px;
    }
  }

  &__header {
    margin: 2rem 0 0;

    &__title {
      margin-top: 1.5rem;
      @include Title(black, 28px, 1px);
    }
  }
  &__description {
    @include Paragraph(black, 0.5, 15px);
    padding: 1.5rem;
  }
}
</style>
