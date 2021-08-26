<template>
  <div class="card" :style="bgColor ? `background-color: ${bgColor}` : ''">
    <div class="card__container">
      <div class="card__container--inner">
        <div class="card__img">
          <slot name="image" />
        </div>
        <div class="card__wrapper">
          <div class="card__title">
            <slot name="title" />
          </div>
          <div class="card__description">
            <slot name="description" />
          </div>
          <div class="card__button">
            <slot name="btn" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',

  props: {
    bgColor: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss">
.card {
  position: relative;
  width: 327px;
  height: 165px;
  border-radius: 8px;
}
</style>
