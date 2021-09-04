<template>
  <div>
    <v-container class="pa-0" style="max-width: 960px">
      <div class="mb-4">
        <span class="title">Profile</span>
      </div>

      <v-card class="shadow">
        <v-card-text class="mb-0">
          <div>
            <span class="title">
              {{ user.firstname }} {{ user.lastname }}
            </span>
          </div>

          <div class="mb-4">
            <span class="body-2">Engineer</span>
          </div>

          <div>
            <v-chip :key="role" class="mr-4" v-for="role in user.roles">
              {{ role }}
            </v-chip>
          </div>
        </v-card-text>

        <v-card-actions class="pa-4">
          <v-btn color="info" class="shadow">Change Password</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'ProfilePage',

  computed: {
    ...mapGetters('auth', {
      user: 'getUser',
    }),
  },
};
</script>

<style lang="scss" scoped></style>
