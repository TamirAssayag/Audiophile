<template>
  <div class="goback">
    <NuxtLink :to="path">
      <v-btn text class="btn btn--goback"> Go Back </v-btn>
    </NuxtLink>
  </div>
</template>

<script>
export default {
  computed: {
    path() {
      return this.$nuxt.context?.from?.path || '/'
    },
  },
}
</script>

<style lang="scss">
.goback {
  padding: 1rem 0 1rem 0;

  @include media('>=md') {
    padding: 2rem 0 2rem 0;
  }

  @include media('>=lg') {
    padding: 3.5rem 0 3.5rem 0;
  }

  .v-btn:not(.v-btn--round).v-size--default {
    padding: 0 !important;
  }
}
</style>
