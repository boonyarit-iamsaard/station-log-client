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

<style lang="scss" scoped></style>
