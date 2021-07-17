<template>
  <div class="mx-auto" style="max-width: 1248px">
    <div class="mb-4">
      <v-btn
        :disabled="pathName === 'task'"
        class="mr-4 shadow"
        color="info"
        exact
        link
        to="/admin"
      >
        Completed Tasks
      </v-btn>

      <v-btn
        :disabled="pathName === 'chargeable-service'"
        class="mr-4 shadow"
        color="info"
        link
        to="/admin/chargeable-service"
      >
        Chargeable Services / Equipments
      </v-btn>
    </div>

    <router-view />
  </div>
</template>

<script>
export default {
  name: 'AdminPage',

  computed: {
    pathName() {
      return this.$route.name;
    },
  },
};
</script>

<style scoped></style>
