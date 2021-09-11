<template>
  <main class="orders">
    <PageHeader title="Orders" class="mb-0" />
    <div class="container mb-10" v-if="allOrders">
      <h2 class="mb-10">Previous Orders ({{ allOrders.length }})</h2>
      <v-row v-if="allOrders.length" justify="center">
        <client-only>
          <v-expansion-panels accordion flat>
            <v-expansion-panel v-for="order in allOrders" :key="order._id">
              <v-expansion-panel-header>
                <p class="text--bold">Order</p>
                {{ getFormattedDate(order.date) }}
              </v-expansion-panel-header>

              <v-expansion-panel-content>
                <div class="order__wrapper">
                  <div
                    v-for="cartItem in order.cart"
                    :key="cartItem.price"
                    class="order__product"
                  >
                    <div class="order__product--image">
                      <NuxtImg
                        provider="storyblok"
                        :src="cartItem.image"
                        :alt="cartItem.title"
                        :aria-label="cartItem.title"
                        :title="cartItem.title"
                      />
                    </div>
                    <div class="order__product--details">
                      <p class="text--bold">{{ cartItem.title }}</p>
                      <div>
                        <span style="min-width: 60px; display: inline-block"
                          >Price
                        </span>
                        <span class="text--bold"
                          >${{ Number(cartItem.price).toLocaleString() }}</span
                        >
                      </div>
                      <div>
                        <span style="min-width: 60px; display: inline-block"
                          >Quantity
                        </span>

                        <span class="text--bold text--gray"
                          >x{{ cartItem.quantity }}</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div class="order__product--total">
                  <span class="text--uppercase text--gray">Grand Total</span>
                  <p class="text--bold mt-2">
                    $ {{ order.grandTotal.toLocaleString() }}
                  </p>
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </client-only>
      </v-row>
      <div v-else class="">
        <h3>No orders yet...</h3>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import PageHeader from '../../components/Layout/UI/PageHeader.vue'
import userApiMixin from '~/mixins/userApiMixin'

export default {
  components: { PageHeader },

  mixins: [userApiMixin],

  meta: {
    hideLayout: true,
    routeName: 'orders',
  },

  asyncData(context) {
    // Fetch by UUID
    // .get(`cdn/stories/cc4ebb9e-398d-4748-96e5-3e4700166333?find_by=uuid`, {})
    if (process.env.NODE_ENV === 'development' || process.server) {
      if (context.store.getters['products/getAllProducts'].length) return {}

      // Load the JSON from the API
      const url = `cdn/stories/`
      return context.app.$storyapi
        .get(url, {
          starts_with: 'products/',
          version: 'draft',
        })
        .then((res) => {
          context.store.commit('products/setAllProducts', res.data.stories)
          return res.data.stories
        })
        .catch((res) => {
          if (!res.response) {
            context.error({
              statusCode: 404,
              message: 'Failed to receive content form api',
            })
          } else {
            console.error(res.response.data)
            context.error({
              statusCode: res.response.status,
              message: res.response.data,
            })
          }
        })
    }
  },
  computed: {
    ...mapGetters({
      allOrders: 'user/getAllUserOrders',
    }),
  },
}
</script>

<style lang="scss">
.orders {
  min-height: 100vh;
  .order {
    &__wrapper {
      padding: 1rem 1.5rem 1rem;
      background-color: $gray;
    }
    &__product {
      display: flex;
      align-items: center;
      gap: 1rem;

      &--total {
        padding: 1rem 1.5rem;
        height: 92px;
        color: white;
        background-color: black;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
        h4 {
          width: 100%;
          text-align: right;
        }
      }

      &--image {
        img {
          border-radius: 8px;
          width: 80px;
        }
      }
    }
  }
}
</style>
