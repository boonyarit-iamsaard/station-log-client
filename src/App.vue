<template>
  <AppLayout>
    <router-view></router-view>
  </AppLayout>
</template>

<script>
import AppLayout from './components/layout/AppLayout';

export default {
  name: 'App',

  components: { AppLayout },

  created() {
    this.$store.dispatch('tryAutoLogin');

    if (this.$store.getters.getIsAuthenticated) {
      this.$store.dispatch('setLogoutTimer');
    }
  },
};
</script>

<style lang="scss" scoped></style>
