import Vue from 'vue';
import {
  MdMenu, MdCard, MdContent, MdTabs, MdButton, MdSteppers, MdProgress, MdField,
} from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css';
import './assets/sass/theme.sass';
import dayjs from 'dayjs';

import router from './router';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(MdMenu);
Vue.use(MdContent);
Vue.use(MdTabs);
Vue.use(MdButton);
Vue.use(MdCard);
Vue.use(MdSteppers);
Vue.use(MdProgress);
Vue.use(MdField);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
