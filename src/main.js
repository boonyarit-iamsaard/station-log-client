import Vue from 'vue';

import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

import '@/assets/styles/index.scss';

// Import shared components
import {
  InputAutocomplete,
  InputCheckbox,
  InputCombo,
  InputDate,
  InputLabel,
  InputSelect,
  InputText,
  InputTextarea,
} from '@/components/shared/input';

// Register shared components globally
Vue.component('input-date', InputDate);
Vue.component('input-autocomplete', InputAutocomplete);
Vue.component('input-checkbox', InputCheckbox);
Vue.component('input-combo', InputCombo);
Vue.component('input-label', InputLabel);
Vue.component('input-select', InputSelect);
Vue.component('input-text', InputText);
Vue.component('input-textarea', InputTextarea);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
