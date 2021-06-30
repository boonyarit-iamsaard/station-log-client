<template>
  <v-app-bar app class="grey lighten-3" flat>
    <v-app-bar-nav-icon
      @click="$emit('open')"
      class="hidden-lg-and-up"
      v-if="user"
    />

    <v-spacer />

    <div class="d-flex align-center" v-if="user">
      <v-btn text v-if="!isMobile">
        <v-icon left> mdi-account-circle </v-icon>
        {{ name }}
      </v-btn>

      <v-btn text @click="logout">
        <v-icon left>mdi-logout-variant</v-icon>
        Logout
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'AppHeader',

  props: {
    isMobile: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    ...mapActions({
      logoutUser: 'auth/logout',
    }),

    logout() {
      this.logoutUser();
      this.$router.push('/login');
    },
  },

  computed: {
    ...mapGetters({
      user: 'auth/getUser',
    }),

    name() {
      return this.user ? `${this.user.firstname} ${this.user.lastname}` : null;
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .v-toolbar__content .v-toolbar__extension {
  padding: 1rem;
}
</style>
