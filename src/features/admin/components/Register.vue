<template>
  <v-row>
    <Progress :isLoading="isLoading" />

    <v-col cols="12" sm="6" md="4" class="mx-auto">
      <v-form ref="signupForm" @submit.prevent="onFormSubmitHandler">
        <v-card outlined>
          <v-card-title class="d-flex justify-center pa-4">
            <span>Signup Form</span>
          </v-card-title>

          <v-card-text class="pa-4">
            <v-text-field
              dense
              label="Firstname"
              outlined
              v-model.trim="formData.firstname"
              :rules="formRules.required"
            ></v-text-field>

            <v-text-field
              dense
              label="Lastname"
              outlined
              v-model.trim="formData.lastname"
              :rules="formRules.required"
            ></v-text-field>

            <v-text-field
              dense
              label="Username"
              outlined
              v-model.trim="formData.username"
              :rules="formRules.required"
            ></v-text-field>

            <v-text-field
              dense
              label="Password"
              type="password"
              outlined
              v-model.trim="formData.password"
              :rules="formRules.required"
            ></v-text-field>

            <v-select
              chips
              deletable-chips
              dense
              label="Roles"
              multiple
              outlined
              v-model="formData.roles"
              :items="roles"
            ></v-select>
          </v-card-text>

          <v-card-actions class="pa-4">
            <v-btn block color="primary" depressed type="submit">Signup</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import Progress from '@/components/shared/Progress';

export default {
  components: { Progress },

  name: 'Register',

  data() {
    return {
      formData: {
        firstname: '',
        lastname: '',
        username: '',
        password: '',
        roles: [],
      },
      formRules: {},
      isLoading: false,
      roles: ['admin', 'common', 'engineer', 'store'],
    };
  },

  methods: {
    async onFormSubmitHandler() {
      this.isLoading = true;

      await this.$store
        .dispatch('signup', this.formData)
        .then(() => (this.isLoading = false))
        .then(() => {
          this.formData = {
            firstname: '',
            lastname: '',
            username: '',
            password: '',
            roles: [],
          };
        })
        .catch(err => {
          this.formData = {
            firstname: '',
            lastname: '',
            username: '',
            password: '',
            roles: [],
          };
          this.isLoading = false;

          this.$store.dispatch('error/setIsError');
          this.$store.dispatch('error/setErrorMessage', err.message);
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
