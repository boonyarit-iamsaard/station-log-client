<template>
  <div>
    <v-container class="pa-0" style="max-width: 960px">
      <div class="mb-4">
        <span class="title">Profile</span>
      </div>

      <v-form ref="changePasswordForm" @submit.prevent="submitNewPassword">
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

          <v-card-text class="py-0" v-if="changePassword">
            <input-text
              label="Current Password*"
              v-model="currentPassword"
              type="password"
            />

            <input-text
              label="New Password*"
              v-model="newPassword"
              type="password"
            />

            <input-text
              label="Confirm New Password*"
              v-model="confirmNewPassword"
              type="password"
            />
          </v-card-text>

          <v-card-actions class="pa-4">
            <v-btn
              @click="changePassword = !changePassword"
              color="info"
              class="shadow"
              v-if="!changePassword"
            >
              Change Password
            </v-btn>

            <v-btn
              @click="cancelChangePassword"
              class="shadow"
              color="secondary"
              v-if="changePassword"
            >
              Cancel
            </v-btn>

            <v-btn
              type="submit"
              color="primary"
              class="ml-auto shadow"
              v-if="changePassword"
            >
              Submit New Password
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
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
      confirmNewPassword: '',
      currentPassword: '',
      newPassword: '',
      roleColors: ['grey', ''],
    };
  },

  methods: {
    cancelChangePassword() {
      this.changePassword = !this.changePassword;
      this.confirmNewPassword = '';
      this.currentPassword = '';
      this.newPassword = '';
    },

    submitNewPassword() {
      console.log(
        this.confirmNewPassword,
        this.currentPassword,
        this.newPassword
      );
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
