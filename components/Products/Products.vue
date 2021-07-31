<template>
  <div class="products">
    <div class="products__container">
      <Card :bg-color="cardColors[0]">
        <template #image>
          <img
            :src="getImageUrl('home/mobile/image-speaker-zx9.png')"
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
          <v-btn elevation="0" class="btn btn--black">SEE PRODUCT</v-btn>
        </template>
      </Card>
      <Card :bg-color="cardColors[1]">
        <template #title>
          <h1>ZX9 Speaker</h1>
        </template>
        <template #btn>
          <v-btn elevation="0" class="btn btn--border">SEE PRODUCT</v-btn>
        </template>
      </Card>
      <Card :bg-color="cardColors[1]"> </Card>
      <Card :bg-color="cardColors[1]">
        <template #title>
          <h1>YX1 EARPHONES</h1>
        </template>
        <template #btn>
          <v-btn elevation="0" class="btn btn--border">SEE PRODUCT</v-btn>
        </template>
      </Card>
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
@import '~/styles/mixins.scss';
.products {
  &__container {
    display: grid;
    place-items: center;
    .card {
      min-height: 600px;
      background-image: url('../../assets/images/circles.svg');
      background-repeat: no-repeat;
      background-size: contain;
      margin-bottom: 1.5rem;

      &__img {
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          width: 172.2px;
          height: 207px;
          margin-top: 2.5rem;
        }
      }

      &__title {
        h1 {
          @include Title(white, 36px, 1.29px);
          width: 95%;
          margin: auto;
          margin-bottom: 1.5rem;
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
      }

      &__wrapper {
        position: absolute;
        top: 45.5%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 1.5rem;
      }

      &:nth-of-type(2) {
        min-height: 320px;
        background-image: url('../../assets/images/home/mobile/image-speaker-zx7.jpg');
        background-repeat: no-repeat;
        background-size: contain;
        filter: contrast(1.25);
        overflow: hidden;

        &::before {
          content: '';
          inset: 0;
          position: absolute;
          background-color: black;
          opacity: 0.2;
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
        }

        .product__see-product {
          @include Button(transparent, black, 1px, black);
          font-weight: bold;
        }
      }

      &:nth-of-type(3) {
        min-height: 200px;
        background-image: url('../../assets/images/home/mobile/image-earphones-yx1.jpg');
        background-repeat: no-repeat;
        background-size: contain;
        filter: contrast(1.1);
        overflow: hidden;
      }

      &:nth-of-type(4) {
        min-height: 200px;
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
          align-items: flex-start;
          justify-content: flex-start;
          transform: translate(0, -50%);
        }

        .product__see-product {
          @include Button(transparent, black, 1px, black);
          font-weight: bold;
        }
      }
    }
  }
}
</style>
