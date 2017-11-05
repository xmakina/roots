import Vue from 'vue'
import App from './App.vue'
let blockstack = require('blockstack')
Object.defineProperty(Vue.prototype, 'blockstack', { value: blockstack })

new Vue({ // eslint-disable-line no-new
  el: '#app',
  render: (h) => h(App)
})
