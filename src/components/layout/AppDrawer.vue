<template>
  <v-navigation-drawer
    app
    v-model="drawer"
    :temporary="$vuetify.breakpoint.lgAndDown"
    :permanent="$vuetify.breakpoint.xl"
  >
    <v-toolbar class="d-flex align-center px-4" flat>
      <v-img
        alt="Company Logo"
        class="shrink mr-4"
        contain
        :src="require('@/assets/images/logo.png')"
        transition="scale-transition"
        height="32"
        width="32"
      />

      <div class="d-flex flex-column">
        <span class="title">Station Log</span>

        <span style="font-size: 10px">Bangkok Engineering</span>
      </div>
    </v-toolbar>

    <v-divider class="grey lighten-4" />

    <v-container class="px-0 pb-0 pt-4">
      <app-drawer-list />
    </v-container>
  </v-navigation-drawer>
</template>

<script>
import AppDrawerList from './AppDrawerList.vue';

export default {
  name: 'AppDrawer',

  components: {
    'app-drawer-list': AppDrawerList,
  },

  data() {
    return {
      drawer: false,
    };
  },
};
</script>

<style lang="scss" scoped></style>
