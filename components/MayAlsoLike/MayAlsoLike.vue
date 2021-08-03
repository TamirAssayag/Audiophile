<template>
  <div class="product__may-like">
    <img
      :key="$screen.desktop"
      :src="displayMayLikeImage"
      :alt="blok.content.title"
      :title="blok.content.title"
    />

    <h1 class="title--uppercase text--center">{{ blok.name }}</h1>
    <NuxtLink :to="'/' + blok.full_slug">
      <v-btn class="btn btn--orange" elevation="0"> See Product </v-btn>
    </NuxtLink>
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

  data: () => ({
    img: null,
  }),

  computed: {
    displayMayLikeImage() {
      if (this.$screen.desktop) {
        return this.getImageUrl(this.blok.content.image, {
          width: '350',
          height: '318',
        })
      } else if (this.$screen.tablet) {
        return this.getImageUrl(this.blok.content.image, {
          width: '223',
          height: '318',
        })
      } else {
        return this.getImageUrl(this.blok.content.image, {
          full: '/fit-in/327x120/filters:fill(F1F1F1)',
        })
      }
    },
  },
}
</script>

<style lang="scss">
.product {
  &__may-like {
    text-align: center;
    min-height: 360px;

    @include media('>=md') {
      min-height: unset;
      min-width: 350px;
      margin-bottom: 10rem;
    }

    img {
      border-radius: 8px;
    }

    h1 {
      margin: 2rem;
    }
  }
}
</style>
