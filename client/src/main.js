import {
  BootstrapVue, BootstrapVueIcons, FormPlugin, IconsPlugin,
} from 'bootstrap-vue';
import axios from 'axios';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
// eslint-disable-next-line import/extensions
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// eslint-disable-next-line import/extensions
import 'bootstrap/dist/js/bootstrap.min.js';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(BootstrapVueIcons);
Vue.use(FormPlugin);
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
