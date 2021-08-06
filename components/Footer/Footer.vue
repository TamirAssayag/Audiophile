<template>
  <div class="footer">
    <div class="footer__container">
      <div class="footer__logo">
        <NuxtLink to="/">
          <AudiophileLogo />
        </NuxtLink>
      </div>

      <ul class="footer__menu">
        <NuxtLink to="/">
          <li class="footer__menu--item" :to="'/'">Home</li>
        </NuxtLink>
        <NuxtLink to="/headphones">
          <li class="footer__menu--item">Headphones</li>
        </NuxtLink>
        <NuxtLink to="/speakers">
          <li class="footer__menu--item">Speakers</li>
        </NuxtLink>
        <NuxtLink to="/earphones">
          <li class="footer__menu--item">Earphones</li>
        </NuxtLink>
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
        <FacebookIcon />
        <TwitterIcon />
        <InstagramIcon />
      </div>
    </div>
  </div>
</template>

<script>
import './Footer.scss'
import AudiophileLogo from '~/static/images/logo.svg?inline'
import FacebookIcon from '~/static/images/shared/desktop/icon-facebook.svg?inline'
import TwitterIcon from '~/static/images/shared/desktop/icon-twitter.svg?inline'
import InstagramIcon from '~/static/images/shared/desktop/icon-instagram.svg?inline'

export default {
  name: 'Footer',
  components: {
    AudiophileLogo,
    FacebookIcon,
    TwitterIcon,
    InstagramIcon,
  },
}
</script>

<style lang="scss"></style>
