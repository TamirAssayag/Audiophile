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

  static async getAllUsers() {
    const res = await this.instance({
      method: 'GET',
      url: '/get-users',
    })
    return res.data
  }

  static async getUser(userId) {
    const res = await this.instance({
      method: 'GET',
      url: '/get-user',
      data: userId,
    })
    return res.data
  }

  static async createUser(user) {
    const res = await this.instance({
      method: 'POST',
      url: '/signup',
      data: user,
    })
    return res.data
  }
}
