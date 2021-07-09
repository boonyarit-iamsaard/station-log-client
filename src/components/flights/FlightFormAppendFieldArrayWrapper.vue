<template>
  <v-col cols="12" class="d-flex align-center pb-4 pt-2 px-2">
    <v-btn
      @click="$emit('appendFieldArray')"
      class="mr-2"
      color="info"
      fab
      small
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <span class="black--text font-weight-medium subtitle-1">
      {{ title }}
    </span>
  </v-col>
</template>

<script>
export default {
  name: 'FlightFormAppendFieldArrayWrapper',

  props: {
    title: {
      type: String,
      default: 'Title',
    },
  },
};
</script>

<style scoped></style>
