<template>
  <div
    v-if="$route.meta.hasPageHeader"
    :class="['page__header', { 'mb-0': getSpecificRoutes }]"
  >
    <h1 class="page__header--title">
      {{ displayTitle }}
    </h1>
  </div>
</template>

<script>
export default {
  name: 'PageHeader',

  props: {
    title: {
      type: String,
      default: '',
    },
  },

  computed: {
    getSpecificRoutes() {
      const routeNames = ['orders', 'checkout', 'login', 'signup']
      return routeNames.includes(this.$route.name)
    },
    displayTitle() {
      if (this.$route.name === 'cart') {
        if (!this.cart.length) {
          return 'Empty Cart'
        } else {
          return `${this.title}(${this.getTotalCartItems})`
        }
      } else {
        return this.title
      }
    },
  },
}
</script>

<style lang="scss">
.page__header {
  background-color: black;
  height: 102px;
  width: 100%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;

  &--title {
    @include Title(null, 28px, 2px);
  }

  @include media('>=md') {
    height: 200px;
    margin-bottom: 7.5rem;

    &--title {
      @include Title(null, 40px, 1.43px);
    }
  }

  @include media('>=lg') {
    height: 256px;
    margin-bottom: 5rem;
  }
}
</style>
