<template>
  <v-row>
    <v-col cols="12" sm="4" class="mx-auto">
      <v-card outlined>
        <v-card-title class="d-flex justify-center pa-4">
          <span>Login</span>
        </v-card-title>

        <v-card-text class="pa-4">
          <v-form ref="signinForm">
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
          </v-form>
        </v-card-text>

        <v-card-actions class="pa-4">
          <v-btn block color="primary" depressed>Login</v-btn>
        </v-card-actions>
      </v-card>
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
};
</script>

<style lang="scss" scoped></style>
