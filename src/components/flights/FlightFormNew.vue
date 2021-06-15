<template>
  <v-card class="mx-auto" color="transparent" flat max-width="599">
    <v-stepper class="elevation-0 transparent" v-model="step" vertical>
      <v-stepper-step class="pa-4" :complete="step > 1" step="1">
        Flight details
        <small>General flight information.</small>
      </v-stepper-step>

      <v-stepper-content class="pa-4 mb-n2 ml-7 mr-n4" step="1">
        <FlightFormFlightDetailNew />

        <v-btn color="primary" depressed @click="step = 2"> Continue </v-btn>

        <v-btn text> Cancel </v-btn>
      </v-stepper-content>

      <v-stepper-step class="pa-4" :complete="step > 2" step="2">
        Services details
      </v-stepper-step>

      <v-stepper-content class="pa-4 mb-n2 ml-7 mr-n4" step="2">
        <v-card outlined class="mb-4" height="200px"></v-card>

        <v-btn color="primary" depressed @click="step = 3"> Continue </v-btn>

        <v-btn text> Cancel </v-btn>
      </v-stepper-content>

      <v-stepper-step class="pa-4" :complete="step > 3" step="3">
        Deferrals
        <small>Amount of defferals have been cleared or worked.</small>
      </v-stepper-step>

      <v-stepper-content class="pa-4 mb-n2 ml-7 mr-n4" step="3">
        <v-card outlined class="mb-4" height="200px"></v-card>

        <v-btn color="primary" depressed @click="step = 4"> Continue </v-btn>

        <v-btn text> Cancel </v-btn>
      </v-stepper-content>

      <v-stepper-step class="pa-4" step="4">
        WO/TASK and non-WO/TASK
      </v-stepper-step>

      <v-stepper-content class="pa-4 mb-n2 ml-7 mr-n4" step="4">
        <v-card outlined class="mb-4" height="200px"></v-card>

        <v-btn color="primary" depressed @click="step = 1"> Continue </v-btn>

        <v-btn text> Cancel </v-btn>
      </v-stepper-content>
    </v-stepper>
  </v-card>
</template>

<script>
import FlightFormFlightDetailNew from './FlightFormFlightDetailNew.vue';

export default {
  name: 'FlightFormNew',

  components: { FlightFormFlightDetailNew },

  data() {
    return {
      step: 1,
    };
  },
};
</script>

<style lang="scss" scoped></style>
