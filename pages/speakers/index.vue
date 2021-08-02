<template>
  <div class="speakers">
    <PageHeader :title="'speakers'" />
    <div class="page__container">
      <template v-for="product in speakers">
        <ProductCard
          v-if="speakers.length"
          :key="product._uid"
          :data="product"
        />
      </template>
      <h1 v-if="!speakers.length" class="no-content">
        There are no speakers yet...
      </h1>
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
        starts_with: 'speakers/',
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
    title: 'Speakers',
  },

  computed: {
    speakers() {
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
