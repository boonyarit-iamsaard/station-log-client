<template>
  <v-overlay :value="isLoading">
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
export default {
  name: 'Progress',

  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped></style>
