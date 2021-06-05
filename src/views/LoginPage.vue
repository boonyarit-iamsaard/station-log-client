<template>
  <v-row>
    <Progress :isLoading="isLoading" />

    <v-col cols="12" sm="6" md="4" class="mx-auto">
      <v-form ref="loginForm" @submit.prevent="onFormSubmitHandler">
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
            <v-btn block color="primary" depressed type="submit">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import Progress from '../components/shared/Progress.vue';
export default {
  components: { Progress },

  name: 'LoginPage',

  data() {
    return {
      formData: {
        username: '',
        password: '',
      },
      formRules: {},
      isLoading: false,
      redirect: '/',
    };
  },

  methods: {
    async onFormSubmitHandler() {
      this.isLoading = true;

      await this.$store
        .dispatch('auth/login', this.formData)
        .then(() => {
          this.isLoading = false;
          this.$router.replace(this.redirect);
        })
        .catch(err => {
          this.isLoading = false;

          this.$store.dispatch('error/setIsError');
          this.$store.dispatch('error/setErrorMessage', err.message);
        });
    },
  },

  created() {
    if (this.$route.query.redirect) {
      this.redirect = this.$route.query.redirect;
    }
  },
};
</script>

<style lang="scss" scoped></style>
