<template>
  <v-app-bar app color="white" flat>
    <v-app-bar-nav-icon
      class="hidden-lg-and-up"
      @click="$emit('open')"
      v-if="$route.path !== '/login'"
    ></v-app-bar-nav-icon>

    <v-toolbar-items class="d-flex align-center">
      <v-img
        alt="Vuetify Logo"
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

    <div class="d-flex" v-if="!isMobile">
      <v-btn class="mr-2" text exact link to="/">
        <v-icon left>mdi-home</v-icon>
        Home
      </v-btn>

      <v-btn class="mr-2" text exact link to="/flights">
        <v-icon left>mdi-airplane</v-icon>
        Flights
      </v-btn>

      <v-btn class="mr-2" text exact link to="/spares">
        <v-icon left>mdi-cog</v-icon>
        Spares
      </v-btn>

      <v-btn text exact link to="/handling">
        <v-icon left>mdi-cog</v-icon>
        3rd Party Handling
      </v-btn>

      <v-btn text exact link to="/handling">
        <v-icon left>mdi-cog</v-icon>
        3rd Party Handling
      </v-btn>
    </div>

    <v-spacer v-if="user"></v-spacer>

    <v-toolbar-title v-if="user">{{ user.firstname }}</v-toolbar-title>
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

  computed: {
    user() {
      return this.$store.getters['getUser'];
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
