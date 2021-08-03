<template>
  <div class="goback">
    <NuxtLink :to="path">
      <v-btn text class="btn btn--goback"> Go Back </v-btn>
    </NuxtLink>
  </div>
</template>

<script>
export default {
  data: () => ({
    path: '/',
  }),
  created() {
    if (this.$nuxt?.context?.from?.path)
      this.path = this.$nuxt.context.from.path
  },
  methods: {
    goBack() {
      return this.$router.back()
    },
  },
}
</script>

<style lang="scss">
.goback {
  padding: 1rem 1.5rem;

  @include media('>=md') {
    padding: 5rem 1.5rem 3.5rem;
  }

  .v-btn:not(.v-btn--round).v-size--default {
    padding: 0 !important;
  }
}
</style>
