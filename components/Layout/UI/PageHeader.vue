<template>
  <div class="page__header">
    <h1 class="page__header--title">
      <slot />
    </h1>
  </div>
</template>

<script>
export default {}
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

  &--title {
    @include Title(null, 28px, 2px);
  }
}
</style>
