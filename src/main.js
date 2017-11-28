import Vue from 'vue'
import router from './router'
import App from './App.vue'
let blockstack = require('blockstack')
const BlockBook = require('blockbook')
Object.defineProperty(Vue.prototype, 'blockstack', { value: blockstack })
Object.defineProperty(Vue.prototype, 'blockbook', { value: new BlockBook.BlockBook() })

new Vue({ // eslint-disable-line no-new
  el: '#app',
  render: (h) => h(App),
  router
})
