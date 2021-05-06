import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#006564',
        secondary: '#C1B49A',
        accent: '#82B1FF',
        error: '#A51E36',
        info: '#1A3668',
        success: '#367D79',
        warning: '#FFC107',
      },
    },
  },
});
