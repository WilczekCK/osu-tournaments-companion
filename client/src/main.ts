import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { MdMenu, MdContent, MdTabs } from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';

Vue.config.productionTip = false;

Vue.use(MdMenu)
Vue.use(MdContent)
Vue.use(MdTabs)

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
