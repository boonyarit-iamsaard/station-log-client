<template>
  <v-speed-dial
    bottom
    direction="top"
    fixed
    right
    v-show="showSpeedDial"
    v-model="fab"
  >
    <template v-slot:activator>
      <v-btn v-model="fab" color="info" dark fab>
        <v-icon v-if="fab"> mdi-close </v-icon>
        <v-icon v-else> mdi-menu </v-icon>
      </v-btn>
    </template>
    <v-btn :to="plusButtonToPath" color="primary" dark fab link>
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-btn color="secondary" dark fab link to="/">
      <v-icon>mdi-home</v-icon>
    </v-btn>
  </v-speed-dial>
</template>

<script>
export default {
  name: 'SpeedDial',

  props: {
    isMobile: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      fab: false,
    };
  },

  computed: {
    plusButtonToPath() {
      switch (this.$route.path) {
        case '/spares':
          return '/spares/create';
        case '/flights':
          return '/flights/create';
        case '/disinfection':
          return '/disinfection/create';
        case '/manpower':
          return '/manpower/create';
        case '/handling':
          return '/handling/create';
        default:
          return '/';
      }
    },

    showSpeedDial() {
      const spares = this.$route.path === '/spares' && this.isMobile;
      const flights = this.$route.path === '/flights' && this.isMobile;
      const disinfection =
        this.$route.path === '/disinfection' && this.isMobile;
      const handling = this.$route.path === '/handling' && this.isMobile;
      const manpower = this.$route.path === '/manpower' && this.isMobile;

      return spares || flights || handling || disinfection || manpower;
    },
  },
};
</script>

<style scoped></style>
