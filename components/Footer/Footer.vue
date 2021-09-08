<template>
  <div class="footer">
    <div class="footer__container">
      <div class="footer__header">
        <div class="footer__logo">
          <NuxtLink to="/">
            <AudiophileLogo />
          </NuxtLink>
        </div>

        <ul class="footer__menu">
          <NuxtLink v-for="nav in navigation" :key="nav.link" :to="nav.link">
            <li class="footer__menu--item">{{ nav.name }}</li>
          </NuxtLink>
        </ul>
      </div>

      <div class="footer__information">
        <div class="footer__about">
          <p>
            Audiophile is an all in one stop to fulfill your audio needs. We're
            a small team of music lovers and sound specialists who are devoted
            to helping you get the most out of personal audio. Come and visit
            our demo facility - we’re open 7 days a week.
          </p>
        </div>

        <div v-if="$screen.desktop" class="footer__social">
          <FacebookIcon />
          <TwitterIcon />
          <InstagramIcon />
        </div>
      </div>

      <div class="footer__bottom">
        <div class="footer__copyright">Copyright 2021. All Rights Reserved</div>

        <div v-if="!$screen.desktop" class="footer__social">
          <FacebookIcon />
          <TwitterIcon />
          <InstagramIcon />
        </div>
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
