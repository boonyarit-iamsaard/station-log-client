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
  </v-list>
</template>

<script>
export default {
  name: 'AppDrawerList',

  data() {
    return {
      items: [
        { title: 'Home', icon: 'mdi-home', path: '/' },
        { title: 'Flights', icon: 'mdi-airplane', path: '/flights' },
        { title: 'Spares', icon: 'mdi-cogs', path: '/spares' },
        {
          title: 'Disinfection',
          icon: 'mdi-hospital-box',
          path: '/disinfection',
        },
        {
          title: 'Sick Leave / OT ',
          icon: 'mdi-account',
          path: '/manpower',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
