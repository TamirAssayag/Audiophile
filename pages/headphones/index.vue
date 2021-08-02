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
import PageHeader from '../../components/Layout/UI/PageHeader.vue'
import ProductCard from '~/components/ProductCard/ProductCard.vue'
export default {
  components: { PageHeader, ProductCard },
  asyncData(context) {
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
  },
  data: () => ({
    stories: [],
  }),
  head: {
    title: 'Headphones',
  },

  computed: {
    headphones() {
      return [...this.stories].reverse()
    },
  },
}
</script>

<style lang="scss">
.headphones {
  margin-bottom: calc(7.5rem - 24px);
}
</style>
