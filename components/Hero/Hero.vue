<template>
  <main>
    <div class="hero">
      <div class="hero__container">
        <NuxtImg
          provider="static"
          src="shared/hero-img.png"
          class="hero__image"
        />
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
            <NuxtLink to="/headphones/xx99-mk-ii">
              <v-btn
                class="hero__header__btn btn btn--orange"
                aria-label="See Product"
                title="See Product"
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
}
</script>
