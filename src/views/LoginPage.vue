<template>
  <v-form ref="form" @submit.prevent="submitForm">
    <v-card class="mt-8 mx-auto shadow" style="max-width: 400px">
      <v-card-title class="d-flex flex-column pa-4">
        <v-img
          :src="require('@/assets/images/logo.png')"
          alt="Company Logo"
          class="shrink mb-4"
          contain
          height="32"
          transition="scale-transition"
          width="32"
        />

        <span class="title">Station Log</span>

        <span class="subtitle-1">Bangkok Engineering</span>
      </v-card-title>

      <v-card-text class="pa-4">
        <input-text
          :rules="formRules.username"
          label="Username"
          v-model.trim="formData.username"
        />

        <input-text
          :rules="formRules.password"
          label="Password"
          type="password"
          v-model.trim="formData.password"
        />
      </v-card-text>

      <v-card-actions class="pb-4 pt-0 px-4">
        <v-btn block class="shadow" color="primary" type="submit">
          Login
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import { mapActions } from 'vuex';

import InputText from '@/components/shared/input/InputText';

export default {
  name: 'LoginPage',

  components: {
    'input-text': InputText,
  },

  data() {
    return {
      formData: {
        username: '',
        password: '',
      },
      formRules: {},
      redirect: '/',
    };
  },

  methods: {
    ...mapActions({
      login: 'auth/login',
      setIsError: 'error/setIsError',
      setErrorMessage: 'error/setErrorMessage',
      setShouldLoading: 'setShouldLoading',
    }),

    submitForm() {
      this.formRules = {
        username: [v => !!v || 'Username is required.'],
        password: [v => !!v || 'Password is required.'],
      };

      this.$nextTick(async () => {
        if (this.$refs.form.validate()) {
          await this.setShouldLoading(true);

          try {
            const user = await this.login(this.formData);

            if (!user) return;

            this.setShouldLoading(false);
            await this.$router.replace(this.redirect);
          } catch (error) {
            this.setShouldLoading(false);

            this.setIsError();
            this.setErrorMessage(error.message);
          }
        }
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
