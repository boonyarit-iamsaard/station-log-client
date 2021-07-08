<template>
  <v-app-bar app class="grey lighten-3" flat>
    <v-app-bar-nav-icon
      @click="$emit('open')"
      class="hidden-xl-only"
      v-if="user"
    />

    <div class="align-center d-flex grey lighten-3" v-if="!extraLargeScreen">
      <v-img
        :src="require('@/assets/images/logo.png')"
        alt="Company Logo"
        class="shrink mr-4"
        contain
        height="32"
        transition="scale-transition"
        width="32"
      />

      <div class="d-flex flex-column">
        <span class="title">Station Log</span>

        <span style="font-size: 10px">Bangkok Engineering</span>
      </div>
    </div>

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

    extraLargeScreen() {
      return this.$vuetify.breakpoint.xl;
    },

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
