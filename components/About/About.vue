<template>
  <section class="about">
    <div class="about__container">
      <div class="about__image">
        <NuxtImg provider="static" src="shared/tablet/image-best-gear.jpg" />
      </div>
      <div class="about__text">
        <div class="about__title">
          <h2>Bringing You The <span>Best</span> Audio Gear</h2>
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
}
</script>
