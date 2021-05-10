<template>
  <v-app>
    <AppHeader
      :isMobile="isMobile"
      @open="$refs.drawer.drawer = !$refs.drawer.drawer"
    />

    <AppDrawer ref="drawer" v-if="user" />

    <v-main class="blue-grey lighten-5">
      <v-container class="pa-4">
        <v-dialog :value="isError" max-width="400">
          <v-alert
            class="mb-0"
            dismissible
            type="error"
            v-if="isError"
            @click="acknowledgeError"
          >
            {{ errorMessage }}
          </v-alert>
        </v-dialog>

        <slot></slot>
      </v-container>

      <v-speed-dial
        bottom
        direction="top"
        fixed
        right
        v-show="shouldShow"
        v-model="fab"
      >
        <template v-slot:activator>
          <v-btn v-model="fab" color="info" dark fab>
            <v-icon v-if="fab"> mdi-close </v-icon>
            <v-icon v-else> mdi-menu </v-icon>
          </v-btn>
        </template>
        <v-btn
          color="primary"
          dark
          fab
          link
          :to="
            $route.path === '/spares' ? '/spares/create' : '/handling/create'
          "
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-btn color="secondary" dark fab link to="/">
          <v-icon>mdi-home</v-icon>
        </v-btn>
      </v-speed-dial>
    </v-main>
  </v-app>
</template>

<script>
import AppDrawer from './AppDrawer';
import AppHeader from './AppHeader';

export default {
  name: 'AppLayout',

  components: { AppHeader, AppDrawer },

  data() {
    return {
      fab: false,
      dialog: true,
    };
  },

  methods: {
    acknowledgeError() {
      this.$store.dispatch('error/setIsError');
      this.$store.dispatch('error/setErrorMessage', null);
    },
  },

  computed: {
    errorMessage() {
      return this.$store.getters['error/getErrorMessage'];
    },

    isError() {
      return this.$store.getters['error/getIsError'];
    },

    isLoading() {
      return this.$store.getters['getIsLoading'];
    },

    isMobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },

    shouldShow() {
      const spares = this.$route.path === '/spares' && this.isMobile;
      const flights = this.$route.path === '/flights' && this.isMobile;
      const handling = this.$route.path === '/handling' && this.isMobile;

      return spares || flights || handling;
    },

    user() {
      return this.$store.getters['getUser'];
    },
  },

  created() {
    console.log('AppLayout created', new Date());
  },
};
</script>

<style lang="scss" scoped></style>
