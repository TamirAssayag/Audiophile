<template>
  <section>
    <Product :data="story" />
  </section>
</template>

<script>
import Product from '~/components/Product/Product.vue'
export default {
  components: {
    Product,
  },
  asyncData(context) {
    // Load the JSON from the API
    return context.app.$storyapi
      .get(`cdn/stories/headphones/${context.params.slug}`, {})
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
