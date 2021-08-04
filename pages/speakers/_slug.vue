<template>
  <section>
    <GoBack />
    <Product :data="story" />
    <div class="product__page__maylike">
      <template v-for="(rel, index) in rels">
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
    return context.app.$storyapi
      .get(`cdn/stories/speakers/${context.params.slug}`, {})
      .then((res) => {
        return res.data
      })
      .catch((res) => {
        if (!res.response) {
          console.error(res)
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
  },
  data: () => ({
    story: { content: {} },
  }),
}
</script>
