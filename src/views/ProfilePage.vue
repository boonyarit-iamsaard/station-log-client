<template>
  <div>
    <v-container class="pa-0" style="max-width: 960px">
      <div class="mb-4">
        <span class="title">Profile</span>
      </div>

      <v-card class="shadow">
        <v-card-text class="mb-0">
          <div class="d-flex align-center justify-space-between">
            <span class="d-block title">
              {{ user.firstname }} {{ user.lastname }}
            </span>

            <div>
              <v-btn color="grey" text>Edit Profile</v-btn>
            </div>
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
          <v-btn @click="clickChangePassword" color="info" class="shadow">
            Change Password
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'ProfilePage',

  data() {
    return {
      changePassword: false,
    };
  },

  methods: {
    clickChangePassword() {
      this.changePassword = !this.changePassword;
    },
  },

  computed: {
    ...mapGetters('auth', {
      user: 'getUser',
    }),
  },
};
</script>

<style lang="scss" scoped></style>
