<template>
  <div class="headphones">
    <PageHeader :title="'Headphones'" />
    <div class="page__container">
      <template v-for="product in headphones">
        <ProductCard :key="product._uid" :data="product" />
      </template>
    </div>
  </div>
</template>

<script>
import PageHeader from '~/components/Layout/UI/PageHeader.vue'
import ProductCard from '~/components/ProductCard/ProductCard.vue'
export default {
  components: { PageHeader, ProductCard },

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
        starts_with: 'headphones/',
        version: 'draft',
      })
      context.store.commit('products/setProducts', products.data.stories)
    }
  },

  head: {
    title: 'Headphones',
  },

  computed: {
    headphones() {
      return [...this.products].reverse()
    },
  },
}
</script>
