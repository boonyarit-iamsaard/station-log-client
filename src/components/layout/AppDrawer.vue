<template>
  <v-navigation-drawer
    app
    v-model="drawer"
    :temporary="$vuetify.breakpoint.mdAndDown"
    :permanent="$vuetify.breakpoint.lgAndUp"
  >
    <v-toolbar flat></v-toolbar>

    <v-divider></v-divider>

    <v-container class="pa-0">
      <AppDrawerList />
    </v-container>
  </v-navigation-drawer>
</template>

<script>
import AppDrawerList from './AppDrawerList.vue';

export default {
  name: 'AppDrawer',

  components: { AppDrawerList },

  data() {
    return {
      drawer: false,
    };
  },
};
</script>

<style lang="scss" scoped></style>
