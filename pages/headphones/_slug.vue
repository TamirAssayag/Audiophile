<template>
  <div class="product__page">
    <GoBack />
    <Product :data="story" />
    <div class="product__page__maylike">
      <template v-for="(rel, index) in relations">
        <MayAlsoLike :key="rel.id + index" :blok="rel" />
      </template>
    </div>
  </div>
</template>

<script>
import Product from '~/components/Product/Product.vue'
import GoBack from '~/components/Layout/UI/GoBack.vue'
import MayAlsoLike from '~/components/MayAlsoLike/MayAlsoLike.vue'
export default {
  components: {
    GoBack,
    Product,
    MayAlsoLike,
  },
  asyncData(context) {
    // Fetch by UUID
    // .get(`cdn/stories/cc4ebb9e-398d-4748-96e5-3e4700166333?find_by=uuid`, {})
    if (process.env.NODE_ENV === 'development' || process.server) {
      // Load the JSON from the API
      const url = `cdn/stories/products/headphones/${context.params.slug}`
      return context.app.$storyapi
        .get(url, {
          resolve_relations: 'Product.more_products',
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
            console.error(res.response.data)
            context.error({
              statusCode: res.response.status,
              message: res.response.data,
            })
          }
        })
    }
  },
  data: () => ({
    rels: { content: {} },
    story: { content: {} },
  }),
  computed: {
    relations() {
      return this.rels
        .filter((rel) => rel.slug !== this.$route.params.slug)
        .slice(0, 3)
    },
  },
}
</script>
