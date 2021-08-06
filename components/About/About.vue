<template>
  <section class="about">
    <div class="about__container">
      <div class="about__image">
        <client-only>
          <NuxtImg
            :key="$screen.tablet + displayAboutImage"
            provider="static"
            :src="getImageUrl(displayAboutImage)"
          />
        </client-only>
      </div>
      <div class="about__text">
        <div class="about__title">
          <h1>Bringing You The <span>Best</span> Audio Gear</h1>
        </div>
        <div class="about__content">
          <p>
            Located at the heart of New York City, Audiophile is the premier
            store for high end headphones, earphones, speakers, and audio
            accessories. We have a large showroom and luxury demonstration rooms
            available for you to browse and experience a wide range of our
            products. Stop by our store to meet some of the fantastic people who
            make Audiophile the best place to buy your portable audio equipment.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import './About.scss'
export default {
  name: 'About',

  computed: {
    displayAboutImage() {
      if (this.$screen.desktop) {
        return 'shared/desktop/image-best-gear.jpg'
      } else if (this.$screen.tablet) {
        return 'shared/tablet/image-best-gear.jpg'
      } else {
        return 'shared/mobile/image-best-gear.jpg'
      }
    },
  },
}
</script>

<style lang="scss"></style>
