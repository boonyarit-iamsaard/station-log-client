<template>
  <AppLayout>
    <router-view />
  </AppLayout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import AppLayout from '@/components/layout/AppLayout';

export default {
  name: 'App',

  components: { AppLayout },

  methods: {
    ...mapActions({
      setLogoutTimer: 'auth/setLogoutTimer',
    }),
  },

  computed: {
    ...mapGetters({
      authenticated: 'auth/getIsAuthenticated',
    }),
  },

  created() {
    if (this.authenticated) {
      this.setLogoutTimer();
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
