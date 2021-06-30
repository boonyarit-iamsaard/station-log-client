<template>
  <v-navigation-drawer
    app
    v-model="drawer"
    :temporary="$vuetify.breakpoint.mdAndDown"
    :permanent="$vuetify.breakpoint.lgAndUp"
  >
    <v-toolbar flat>
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
        <span class="caption">Bangkok Engineering</span>
      </div>
    </v-toolbar>

    <v-container class="px-0 pb-0 pt-4">
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
