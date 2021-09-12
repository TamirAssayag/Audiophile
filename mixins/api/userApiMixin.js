export default {
  methods: {
    createUser(data) {
      return this.$axios.$post('/signup', data).then((res) => res.data)
    },
    loginUser(credentials) {
      return this.$axios.$post('/login', credentials).then((res) => res.data)
    },
    postPurchase(data) {
      return this.$axios.$post('/add-order', data).then((res) => res.data)
    },
    getUserData() {
      return this.$axios.$get('/get-user').then((res) => res.data)
    },
  },
}
