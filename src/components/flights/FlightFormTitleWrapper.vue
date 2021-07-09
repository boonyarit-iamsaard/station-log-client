<template>
  <v-card-title>
    <v-row>
      <v-col class="mb-2" cols="12">
        <span class="black--text font-weight-medium subtitle-1">
          {{ title }}
        </span>
      </v-col>
    </v-row>
  </v-card-title>
</template>

<script>
export default {
  name: 'FlightFormTitleWrapper',

  props: {
    title: {
      type: String,
      default: 'Title',
    },
  },
};
</script>

<style scoped></style>
