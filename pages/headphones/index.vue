<template>
  <div class="headphones">
    <div class="page__container">
      <template v-for="(product, i) in headphones">
        <ProductCard
          v-if="headphones.length"
          :key="product._uid"
          :data="product"
          :index="i"
        />
      </template>
      <h1 v-if="!headphones.length" class="no-content">
        There are no headphones yet...
      </h1>
    </div>
  </div>
</template>

<script>
import ProductCard from '~/components/ProductCard/ProductCard.vue'
export default {
  components: { ProductCard },

  // transition: 'fade',

  asyncData(context) {
    if (process.env.NODE_ENV === 'development' || process.server) {
      return context.app.$storyapi
        .get('cdn/stories', {
          starts_with: 'headphones/',
          version: 'draft',
        })
        .then((res) => {
          return res.data
        })

        .catch((res) => {
          if (!res.response) {
            context.error({
              statusCode: 404,
              message: 'Failed to receive content form api',
            })
          } else {
            context.error({
              statusCode: res.response.status,
              message: res.response.data,
            })
          }
        })
    }
  },

  data: () => ({
    stories: [],
  }),

  async fetch(context) {
    if (process.env.NODE_ENV === 'development' || process.server) {
      const products = await context.app.$storyapi.get(`cdn/stories/`, {
        starts_with: 'products/headphones/',
        version: 'draft',
      })
      context.store.commit('products/setProducts', products.data.stories)
    }
  },

  head: {
    title: 'Headphones',
  },

  meta: {
    hasPageHeader: true,
    routeName: 'headphones',
  },

  computed: {
    headphones() {
      return [...this.products].reverse()
    },
  },
}
</script>
