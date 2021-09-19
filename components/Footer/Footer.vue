<template>
  <div class="footer">
    <div class="footer__container">
      <div class="footer__header">
        <div class="footer__logo">
          <client-only>
            <NuxtLink to="/">
              <AudiophileLogo />
            </NuxtLink>
          </client-only>
        </div>

        <ul class="footer__menu">
          <li
            v-for="nav in navigation"
            :key="nav.link"
            class="footer__menu--item"
          >
            <NuxtLink :to="nav.link">
              {{ nav.name }}
            </NuxtLink>
          </li>
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

        <client-only>
          <div v-show="$screen.desktop" class="footer__social">
            <FacebookIcon />
            <TwitterIcon />
            <InstagramIcon />
          </div>
        </client-only>
      </div>

      <div class="footer__bottom">
        <div class="footer__copyright">Copyright 2021. All Rights Reserved</div>
        <client-only>
          <div v-show="!$screen.desktop" class="footer__social">
            <FacebookIcon />
            <TwitterIcon />
            <InstagramIcon />
          </div>
        </client-only>
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
