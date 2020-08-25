import Vue from 'vue'
import App from './App.vue'

import { store } from './store';
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import '@mdi/font/css/materialdesignicons.css'

new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
