<template>
  <div class="page__header">
    <h1 class="page__header--title">
      {{ title }}
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
