<template>
  <v-row>
    <v-overlay absolute :value="isLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <v-col cols="12" sm="6" md="4" class="mx-auto">
      <v-form ref="signinForm" @submit.prevent="onFormSubmitHandler">
        <v-card outlined>
          <v-card-title class="d-flex justify-center pa-4">
            <span>Please Login</span>
          </v-card-title>

          <v-card-text class="pa-4">
            <v-text-field
              dense
              label="Username"
              outlined
              v-model.trim="formData.username"
            ></v-text-field>
            <v-text-field
              dense
              label="Password"
              type="password"
              outlined
              v-model.trim="formData.password"
            ></v-text-field>
          </v-card-text>

          <v-card-actions class="pa-4">
            <v-btn block color="primary" depressed type="submint">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'SigninPage',

  data() {
    return {
      formData: {
        username: '',
        password: '',
      },
      formRules: {},
    };
  },

  methods: {
    async onFormSubmitHandler() {
      await this.$store.dispatch('setIsLoading');

      await this.$store.dispatch('login', this.formData);

      await this.$store.dispatch('setIsLoading');

      await this.$router.replace('/');
    },
  },

  computed: {
    isLoading() {
      return this.$store.getters['getIsLoading'];
    },
  },
};
</script>

<style lang="scss" scoped></style>
