<template>
  <v-overlay :value="shouldLoading">
    <v-card light width="300">
      <v-card-text class="d-flex align-center pa-4">
        <v-progress-circular
          class="mr-4"
          color="primary"
          indeterminate
          size="32"
        />
        <span class="body-1">Please wait...</span>
      </v-card-text>
    </v-card>
  </v-overlay>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'LoadingProgress',

  computed: {
    ...mapGetters({
      shouldLoading: 'getShouldLoading',
    }),
  },
};
</script>

<style scoped></style>
