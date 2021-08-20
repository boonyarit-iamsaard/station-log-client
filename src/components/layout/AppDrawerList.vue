<template>
  <v-list dense nav>
    <v-list-item-group>
      <v-list-item
        color="primary"
        exact
        link
        v-for="item in items"
        :key="item.title"
        :to="item.path"
      >
        <v-list-item-icon>
          <v-icon v-text="item.icon"></v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>

    <v-divider class="my-4" v-if="admin" />

    <v-list-item-group v-if="admin">
      <v-list-item color="primary" exact link to="/admin">
        <v-list-item-icon>
          <v-icon> mdi-account </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title> Admin </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'AppDrawerList',

  data() {
    return {
      items: [
        {
          icon: 'mdi-home',
          path: '/',
          requireAdminRole: false,
          title: 'Home',
        },
        {
          icon: 'mdi-airplane',
          path: '/flights',
          requireAdminRole: false,
          title: 'Flights',
        },
        {
          icon: 'mdi-cogs',
          path: '/spares',
          requireAdminRole: false,
          title: 'Spares',
        },
        {
          icon: 'mdi-hospital-box',
          path: '/disinfection',
          requireAdminRole: false,
          title: 'Disinfection',
        },
        {
          icon: 'mdi-account-multiple',
          path: '/manpower',
          requireAdminRole: false,
          title: 'Sick Leave / OT',
        },
        {
          icon: 'mdi-paperclip',
          path: '/station-handover',
          requireAdminRole: false,
          title: 'Station Handover',
        },
        {
          icon: 'mdi-airplane-off',
          path: '/aog-handover',
          requireAdminRole: false,
          title: 'AOG Handover',
        },
      ],
    };
  },

  computed: {
    ...mapGetters({
      admin: 'auth/getIsAdmin',
    }),
  },
};
</script>

<style lang="scss" scoped></style>
