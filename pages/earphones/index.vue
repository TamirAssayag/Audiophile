<template>
  <div class="earphones">
    <PageHeader :title="'earphones'" />
    <div class="page__container">
      <template v-for="product in earphones">
        <Product v-if="earphones.length" :key="product._uid" :data="product" />
      </template>
      <h1 v-if="!earphones.length" class="no-content">
        There are no earphones yet...
      </h1>
    </div>
  </div>
</template>

<script>
import PageHeader from '../../components/Layout/UI/PageHeader.vue'
import Product from '~/components/Product/Product.vue'
export default {
  components: { PageHeader, Product },
  asyncData(context) {
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
  },
  data: () => ({
    stories: [],
  }),
  head: {
    title: 'Earphones',
  },

  computed: {
    earphones() {
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
