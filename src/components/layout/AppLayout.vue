<template>
  <v-app>
    <AppHeader
      :isMobile="isMobile"
      @open="$refs.drawer.drawer = !$refs.drawer.drawer"
    />

    <AppDrawer ref="drawer" v-if="isMobile" />

    <v-main class="blue-grey lighten-5">
      <v-container
        :class="$route.path === '/login' ? 'pa-4 fill-height' : 'pa-4'"
      >
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
    };
  },

  computed: {
    shouldShow() {
      const spares = this.$route.path === '/spares' && this.isMobile;
      const flights = this.$route.path === '/flights' && this.isMobile;
      const handling = this.$route.path === '/handling' && this.isMobile;

      return spares || flights || handling;
    },

    isLoading() {
      return this.$store.getters['getIsLoading'];
    },

    isMobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },
  },
};
</script>

<style lang="scss" scoped></style>
