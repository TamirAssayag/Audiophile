import axios from 'axios'
import Vue from 'vue'
// Add a request interceptor

const BASE_API_URL = '/.netlify/functions/'

export default class API {
  static get instance() {
    const instance = axios.create({
      baseURL: BASE_API_URL,
    })

    instance.interceptors.request.use((config) => {
      console.log(config.headers)
      if (!Vue.prototype.$store?.user?.userId)
        config.headers = {
          Authorization:
            Vue.prototype.$store?.user?.userId ?? '610ed87570e4a9389cb34f55',
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
}
