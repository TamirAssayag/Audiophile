<template>
  <div class="footer">
    <div class="footer__container">
      <div class="footer__logo">
        <nuxt-link to="/">
          <InlineSvg :src="getImageUrl('logo.svg')" />
        </nuxt-link>
      </div>

      <ul class="footer__menu">
        <nuxt-link to="/">
          <li class="footer__menu--item" :to="'/'">Home</li>
        </nuxt-link>
        <nuxt-link to="/headphones">
          <li class="footer__menu--item">Headphones</li>
        </nuxt-link>
        <nuxt-link to="/speakers">
          <li class="footer__menu--item">Speakers</li>
        </nuxt-link>
        <nuxt-link to="/earphones">
          <li class="footer__menu--item">Earphones</li>
        </nuxt-link>
      </ul>

      <div class="footer__about">
        <p>
          Audiophile is an all in one stop to fulfill your audio needs. We're a
          small team of music lovers and sound specialists who are devoted to
          helping you get the most out of personal audio. Come and visit our
          demo facility - we’re open 7 days a week.
        </p>
      </div>

      <div class="footer__copyright">Copyright 2021. All Rights Reserved</div>

      <div class="footer__social">
        <InlineSvg :src="getImageUrl('shared/desktop/icon-facebook.svg')" />
        <InlineSvg :src="getImageUrl('shared/desktop/icon-twitter.svg')" />
        <InlineSvg :src="getImageUrl('shared/desktop/icon-instagram.svg')" />
      </div>
    </div>
  </div>
</template>

<script>
import './Footer.scss'
export default {
  name: 'Footer',
}
</script>

<style lang="scss"></style>
