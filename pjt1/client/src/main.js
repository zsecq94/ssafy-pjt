import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import VueGlide from 'vue-glide-js'
import 'vue-glide-js/dist/vue-glide.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import router from './router'
import store from './store'

import VueSession from 'vue-session'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

Vue.use(VueSession);
Vue.use(VueGlide)

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
