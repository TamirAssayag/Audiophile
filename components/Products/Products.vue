<template>
  <div class="products">
    <div class="products__container">
      <Card :bg-color="cardColors[0]">
        <template #image>
          <NuxtImg
            provider="static"
            src="home/desktop/image-speaker-zx9.png"
            alt="ZX9 Speaker"
            title="ZX9 Speaker"
            aria-label="ZX9 Speaker"
          />
        </template>
        <template #title>
          <h1>ZX9 Speaker</h1>
        </template>
        <template #description>
          <p>
            Upgrade to premium speakers that are phenomenally built to deliver
            truly remarkable sound.
          </p>
        </template>
        <template #btn>
          <NuxtLink to="/speakers/zx9-speaker">
            <v-btn elevation="0" class="btn btn--black">SEE PRODUCT</v-btn>
          </NuxtLink>
        </template>
      </Card>
      <Card :bg-color="cardColors[1]">
        <template #title>
          <h1>ZX7 Speaker</h1>
        </template>
        <template #btn>
          <NuxtLink to="/speakers/zx7-speaker">
            <v-btn elevation="0" class="btn btn--border">SEE PRODUCT</v-btn>
          </NuxtLink>
        </template>
      </Card>
      <div class="earphones__container">
        <Card :bg-color="cardColors[1]"> </Card>
        <Card :bg-color="cardColors[1]">
          <template #title>
            <h1>YX1 EARPHONES</h1>
          </template>
          <template #btn>
            <NuxtLink to="/earphones/yx1-wireless-earphones">
              <v-btn elevation="0" class="btn btn--border">SEE PRODUCT</v-btn>
            </NuxtLink>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
import Card from '../Layout/UI/Card.vue'
export default {
  components: { Card },
  data: () => ({
    cardColors: ['#d87d4a', '#f1f1f1'],
  }),
}
</script>

<style lang="scss">
.products {
  margin-bottom: 7.5rem;
  &__container {
    display: grid;
    place-items: center;
    .card {
      min-height: 600px;
      background-image: url('../../static/images/circles.svg');
      background-repeat: no-repeat;
      background-size: contain;
      margin-bottom: 1.5rem;
      overflow: hidden;

      @include media('>=lg') {
        background-image: url('../../static/images/circles-desktop.svg');
        width: 1110px;
        height: 560px;
        margin-bottom: 3rem;

        &__container {
          height: 100%;
          &--inner {
            display: flex;
            align-items: center;
            height: 100%;
            width: 100%;
          }
        }
      }

      &__img {
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          width: 172.2px;
          height: 207px;
          margin-top: 2.5rem;
        }

        @include media('>=lg') {
          width: 67%;

          img {
            width: 400px;
            height: 483.5px;
            position: absolute;
            top: 5.5rem;
          }
        }
      }

      &__title {
        h1 {
          @include Title(white, 36px, 1.29px);
          width: 95%;
          margin: auto;
          margin-bottom: 1.5rem;

          @include media('>=lg') {
            @include Title(white, 56px, 2px);
            margin: 0;
            text-align: left;
          }
        }
        text-align: center;
      }

      &__description {
        opacity: 0.75;
        font-size: 15px;
        font-weight: 200;
        line-height: 1.67;
        text-align: center;
        color: #ffffff;
        margin-bottom: 1.5rem;

        @include media('>=lg') {
          width: 330px;
          text-align: left;
          margin-top: 1.5rem;
        }
      }

      &__wrapper {
        position: absolute;
        top: 45.5%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 1.5rem;

        @include media('>=lg') {
          position: unset;
          justify-content: flex-start;
          align-items: flex-start;
        }
      }

      &:nth-of-type(2) {
        min-height: 320px;
        background-image: url('../../static/images/home/mobile/image-speaker-zx7.jpg');
        background-repeat: no-repeat;
        background-size: contain;
        filter: contrast(1.25);
        overflow: hidden;

        @include media('>lg') {
          background-image: url('../../static/images/home/desktop/image-speaker-zx7.jpg');
          // background-position-x: 18rem;
          height: 320px;
        }

        &::before {
          content: '';
          inset: 0;
          position: absolute;
          background-color: black;
          opacity: 0.2;
        }

        @include media('>=lg') {
          .card__img {
            width: unset;
          }
        }

        .card__title {
          h1 {
            width: 100%;
            @include Title(black, 28px, 2px);
            margin-bottom: 32px;
          }
        }

        .card__wrapper {
          top: 32%;
          padding: 0;
          padding-left: 1.5rem;
          display: block;
          align-items: flex-start;
          justify-content: flex-start;

          @include media('>=lg') {
            margin-left: 95px;
          }
        }

        .product__see-product {
          @include Button(transparent, black, 1px, black);
          font-weight: bold;
        }
      }
    }
    .earphones__container {
      @include media('>=lg') {
        display: flex;
        align-items: center;
        gap: 1.5rem;
      }
      .card {
        &:nth-of-type(1) {
          min-height: 200px;
          background-image: url('../../static/images/home/mobile/image-earphones-yx1.jpg');
          background-repeat: no-repeat;
          background-size: contain;
          filter: contrast(1.1);
          overflow: hidden;

          @include media('>=lg') {
            margin-bottom: 0;
            width: 540px;
            height: 320px;
            background-image: url('../../static/images/home/desktop/image-earphones-yx1.jpg');
            border-radius: 8px !important;
          }
        }

        &:nth-of-type(2) {
          background-image: unset;
          min-height: 200px;
          @include media('>=lg') {
            width: 540px;
            height: 320px;
            margin-bottom: 0;
          }
          .card__title {
            h1 {
              width: 100%;
              @include Title(black, 28px, 2px);
              margin-bottom: 32px;
            }
          }

          .card__wrapper {
            top: 50%;
            padding: 0;
            padding-left: 1.5rem;
            display: block;
            align-items: center;
            justify-content: center;
            transform: translate(0, -50%);

            @include media('>=lg') {
              top: 0;
              align-items: center;
              justify-content: center;
              padding: 0;
              transform: translate(0, 0);
            }
          }

          .product__see-product {
            @include Button(transparent, black, 1px, black);
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>
