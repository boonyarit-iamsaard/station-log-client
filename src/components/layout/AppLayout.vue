<template>
  <v-app>
    <LoadingProgress />

    <AppHeader
      :isMobile="isMobile"
      @open="$refs.sidenav.drawer = !$refs.sidenav.drawer"
      v-if="user"
    />

    <AppDrawer ref="sidenav" v-if="user" />

    <v-main class="grey lighten-3">
      <v-container class="pa-4">
        <v-dialog :value="isError" max-width="400">
          <v-alert
            @click="acknowledgeError"
            class="mb-0"
            dismissible
            type="error"
            v-if="isError"
          >
            {{ errorMessage }}
          </v-alert>
        </v-dialog>

        <slot></slot>
      </v-container>

      <AppSpeedDial :isMobile="isMobile" />
    </v-main>
  </v-app>
</template>

<script>
import AppDrawer from './AppDrawer';
import AppHeader from './AppHeader';
import AppSpeedDial from '@/components/shared/SpeedDial';
import LoadingProgress from '@/components/shared/LoadingProgress';

export default {
  name: 'AppLayout',

  components: { LoadingProgress, AppSpeedDial, AppHeader, AppDrawer },

  data() {
    return {
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

    isMobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },

    user() {
      return this.$store.getters['auth/getUser'];
    },
  },
};
</script>

<style lang="scss" scoped></style>
