<template>
  <v-speed-dial
    bottom
    direction="top"
    fixed
    right
    v-show="showSpeedDial"
    v-model="fab"
  >
    <template v-slot:activator>
      <v-btn v-model="fab" color="info" dark fab>
        <v-icon v-if="fab"> mdi-close </v-icon>
        <v-icon v-else> mdi-menu </v-icon>
      </v-btn>
    </template>
    <v-btn :to="plusButtonToPath" color="primary" dark fab link>
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-btn color="secondary" dark fab link to="/">
      <v-icon>mdi-home</v-icon>
    </v-btn>
  </v-speed-dial>
</template>

<script>
export default {
  name: 'SpeedDial',

  props: {
    isMobile: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      fab: false,
    };
  },

  computed: {
    path() {
      return this.$route.path;
    },

    plusButtonToPath() {
      return this.path !== '/' ? this.path + '/create' : '/';
    },

    showSpeedDial() {
      return (
        this.path !== '/' &&
        this.isMobile &&
        !this.path.includes('admin') &&
        !this.path.includes('edit') &&
        !this.path.includes('create')
      );
    },
  },
};
</script>

<style scoped></style>
