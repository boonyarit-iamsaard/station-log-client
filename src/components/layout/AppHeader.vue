<template>
  <v-app-bar app color="white" flat>
    <v-app-bar-nav-icon
      class="hidden-lg-and-up"
      v-if="user"
      @click="$emit('open')"
    ></v-app-bar-nav-icon>

    <v-toolbar-items class="d-flex align-center">
      <v-img
        alt="Company Logo"
        class="shrink"
        contain
        src="../../assets/logo.png"
        transition="scale-transition"
        height="30"
        width="30"
      />
    </v-toolbar-items>

    <v-toolbar-title class="ml-4"> {{ title }} </v-toolbar-title>

    <v-spacer></v-spacer>

    <div class="d-flex align-center" v-if="user">
      <v-btn rounded text v-if="!isMobile">
        <v-icon left> mdi-account-circle </v-icon>
        {{ name }}
      </v-btn>

      <v-btn rounded text @click="logout">
        <v-icon left>mdi-logout-variant</v-icon>
        Logout
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  name: 'AppHeader',

  props: {
    isMobile: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    logout() {
      this.$store
        .dispatch('auth/logout')
        .then(() => this.$router.push('/login'))
        .catch(err => console.log(err));
    },
  },

  computed: {
    user() {
      return this.$store.getters['auth/getUser'];
    },

    name() {
      if (this.user) {
        return `${this.user.firstname} ${this.user.lastname}`;
      }
      return null;
    },

    title() {
      switch (this.$route.path) {
        case '/flights':
          return 'Flights Movement';
        case '/spares':
          return 'Spares Movement';
        case '/handling':
          return '3rd Party Handling Record';
        case '/handling/create':
          return '3rd Party Handling Form';
        case '/spares/create':
          return 'Spares Movement Form';
        case `/spares/edit/${this.$route.params.id}`:
          return 'Spares Movement Form';
        case `/handling/edit/${this.$route.params.id}`:
          return '3rd Party Handling Form';
        default:
          return this.$vuetify.breakpoint.smAndUp
            ? 'Bangkok Engineering - Station Log'
            : 'Station Log';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .v-toolbar__content .v-toolbar__extension {
  padding: 1rem;
}
</style>
