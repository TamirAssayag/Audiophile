<template>
  <main>
    <div class="hero">
      <div class="hero__container">
        <v-img :src="getImageUrl(displayHeroImg())" class="hero__image" />
        <div class="hero__wrapper">
          <div class="hero__header">
            <div class="hero__header__subtitle subtitle subtitle--white">
              New Product
            </div>
            <div class="hero__header__title">XX99 Mark II Headphones</div>
            <div class="hero__header__description">
              Experience natural, lifelike audio and exceptional build quality
              made for the passionate music enthusiast.
            </div>
            <NuxtLink to="/headphones/x99-mark-ii">
              <v-btn class="hero__header__btn btn btn--orange"
                >See Product</v-btn
              >
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import './Hero.scss'
export default {
  name: 'Hero',

  data: () => ({}),

  methods: {
    displayHeroImg() {
      if (this.$screen.lg) {
        return 'home/desktop/image-hero.jpg'
      } else if (this.$screen.md) {
        return 'home/tablet/image-header.jpg'
      } else {
        return 'home/mobile/image-header.jpg'
      }
    },
  },
}
</script>

<style lang="scss"></style>
