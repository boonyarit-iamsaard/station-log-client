<template>
  <AppLayout>
    <router-view />
  </AppLayout>
</template>

<script>
import AppLayout from './components/layout/AppLayout';

export default {
  name: 'App',

  components: { AppLayout },

  created() {
    if (this.$store.getters['auth/getIsAuthenticated']) {
      this.$store.dispatch('auth/setLogoutTimer');
    }
  },
};
</script>

<style lang="scss" scoped>
::v-deep .v-autocomplete__content.v-menu__content {
  border-radius: 8px;
}
::v-deep .v-menu__content {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}
</style>
