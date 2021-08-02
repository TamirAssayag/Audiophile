<template>
  <div class="product__may-also-like">
    <img
      :src="
        getImageUrl(blok.content.image, {
          full: '/fit-in/327x120/filters:fill(F1F1F1)',
        })
      "
      :alt="blok.content.title"
      :title="blok.content.title"
    />
    <h1 class="title--uppercase text--center">{{ blok.content.title }}</h1>
    <v-btn class="btn btn--orange" elevation="0" @click="directToProduct">
      See Product
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'MayAlsoLike',
  props: {
    blok: {
      type: null,
      default: null,
    },
  },

  methods: {
    directToProduct() {
      this.$router.push(this.blok.full_slug)
    },
  },
}
</script>

<style lang="scss">
.product {
  &__may-also-like {
    text-align: center;
    height: 360px;

    img {
      border-radius: 8px;
    }

    h1 {
      margin: 2rem;
    }
  }
}
</style>
