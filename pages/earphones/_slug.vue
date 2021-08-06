<template>
  <section class="product__page">
    <GoBack />
    <Product :data="story" />
    <div class="product__page__maylike">
      <template v-for="(rel, index) in relations">
        <MayAlsoLike :key="rel.id + index" :blok="rel" />
      </template>
    </div>
  </section>
</template>

<script>
import GoBack from '~/components/Layout/UI/GoBack.vue'
import Product from '~/components/Product/Product.vue'
import MayAlsoLike from '~/components/MayAlsoLike/MayAlsoLike.vue'

export default {
  components: {
    GoBack,
    Product,
    MayAlsoLike,
  },

  asyncData(context) {
    // Load the JSON from the API
    if (process.server) {
      const url = `cdn/stories/earphones/${context.params.slug}`
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
