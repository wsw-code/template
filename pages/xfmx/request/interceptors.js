// 拦截器
import axios from 'axios'
import Vue from 'vue'

window.vueEvents = new Vue()
let requestNum = 0
axios.defaults.timeout = 10000
axios.interceptors.request.use(
  config => {
    requestNum++
    window.vueEvents.$emit('open')
    return config
  },
  err => {
    return Promise.reject(err)
  })
axios.interceptors.response.use(

  response => {
    requestNum--
    if (requestNum === 0) {
      window.vueEvents.$emit('close')
    }
    if (response.data.error) {
      window.vueEvents.$emit('error', response.data.error.message)
      return Promise.reject(response.data.error)
    }
    return response.data
  },
  error => {
    requestNum--
    if (requestNum === 0) {
      window.vueEvents.$emit('close')
    }
    if (error.code === 'ECONNABORTED') {
      window.vueEvents.$emit('timeout')
    }
    return Promise.reject(error)
  })
