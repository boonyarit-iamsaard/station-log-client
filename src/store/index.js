import Vue from 'vue';
import Vuex from 'vuex';

import authModule from '@/store/modules/auth';
import errorModule from '@/store/modules/error';
import handlingModule from '@/store/modules/handling';
import sparesModule from '@/store/modules/spares';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth: authModule,
    error: errorModule,
    handling: handlingModule,
    spares: sparesModule,
  },
});
