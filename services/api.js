import axios from 'axios'
import Vue from 'vue'
// Add a request interceptor

const BASE_API_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8888/.netlify/functions/'
    : '/.netlify/functions/'

export default class API {
  static get instance() {
    const instance = axios.create({
      baseURL: BASE_API_URL,
    })

    instance.interceptors.request.use((config) => {
      if (!Vue.prototype.$store?.user?.userId)
        config.headers = {
          Authorization: Vue.prototype.$store?.user?.userId ?? null,
        }
      console.log(config.headers)

      return config
    })

    return instance
  }

  static getAllUsers() {
    return this.instance({
      method: 'GET',
      url: '/get-users',
    }).then((res) => {
      return res.data
    })
  }

  static getUser(userId) {
    return this.instance({
      method: 'GET',
      url: '/get-user',
      data: userId,
    }).then((res) => {
      return res.data
    })
  }

  static createUser(user) {
    return this.instance({
      method: 'POST',
      url: '/signup',
      data: user,
    }).then((res) => {
      return res.data
    })
  }

  static userLogin(user) {
    return this.instance({
      method: 'POST',
      url: '/login',
      data: user,
    }).then((res) => {
      return res.data
    })
  }

  static addOrder(order) {
    return this.instance({
      method: 'POST',
      url: '/add-order',
      data: order,
    }).then((res) => {
      return res.data
    })
  }
}
