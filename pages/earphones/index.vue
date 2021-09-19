<template>
  <div class="earphones">
    <div class="page__container">
      <template v-for="(product, i) in earphones">
        <ProductCard
          v-if="earphones.length"
          :key="product._uid"
          :data="product"
          :index="i"
        />
      </template>
      <h1 v-if="!earphones.length" class="no-content">
        There are no earphones yet...
      </h1>
    </div>
  </div>
</template>

<script>
import ProductCard from '~/components/ProductCard/ProductCard.vue'
export default {
  components: { ProductCard },

  asyncData(context) {
    if (process.env.NODE_ENV === 'development' || process.server) {
      return context.app.$storyapi
        .get('cdn/stories', {
          starts_with: 'earphones/',
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
        starts_with: 'products/earphones/',
        version: 'draft',
      })
      context.store.commit('products/setProducts', products.data.stories)
    }
  },

  head: {
    title: 'Earphones',
  },

  meta: {
    hasPageHeader: true,
    routeName: 'earphones',
  },

  computed: {
    earphones() {
      return [...this.products].reverse()
    },
  },
}
</script>
