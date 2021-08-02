<template>
  <section>
    <GoBack />
    <Product :data="story" />
    <template v-for="rel in rels">
      <MayAlsoLike :key="rel.name" :blok="rel" />
    </template>
  </section>
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

    // Load the JSON from the API
    return context.app.$storyapi
      .get(
        `cdn/stories/headphones/${context.params.slug}?&resolve_relations=more_products`,
        {}
      )
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
    rels: { content: {} },
    story: { content: {} },
  }),
}
</script>
