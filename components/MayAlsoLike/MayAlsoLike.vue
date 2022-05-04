<template>
  <div class="product__may-like">
    <div class="product__may-like--image">
      <NuxtImg
        :key="$screen.md + displayMayLikeImage.width"
        provider="storyblok"
        :src="blok.content.image"
        :alt="blok.content.title"
        :title="blok.content.title"
        :width="displayMayLikeImage.width"
        :height="displayMayLikeImage.height"
      />
    </div>
    <h1 class="title--uppercase text--center">{{ blok.name }}</h1>
    <v-btn
      class="btn btn--orange"
      elevation="0"
      title="See Product"
      aria-label="See Product"
      :to="blok.full_slug.replace('products', '')"
    >
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
  computed: {
    displayMayLikeImage() {
      if (this.$screen.desktop) {
        return {
          width: '350',
          height: '318',
        }
      } else if (this.$screen.tablet) {
        return {
          width: '223',
          height: '318',
        }
      } else {
        return {
          full: '/fit-in/327x120/filters:fill(F1F1F1)',
        }
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
      min-width: 0;
    }

    @include media('>=lg') {
      min-width: 350px;
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
