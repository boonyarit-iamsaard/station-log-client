<template>
  <v-form ref="flightForm" @submit.prevent="validateFlightData">
    <v-card class="mx-auto" max-width="959" outlined>
      <FlightDetails
        ref="flightDetailsForm"
        :getFlightDetails="getFlightDetails"
      />

      <v-card-actions class="px-4 pt-0 pb-4">
        <v-row class="ma-0">
          <v-col cols="12" sm="2" :class="isMobile ? 'pt-0 pb-2 px-0' : 'pa-0'">
            <v-btn block color="primary" depressed outlined>
              <v-icon left>mdi-close</v-icon>
              CANCEL
            </v-btn>
          </v-col>

          <v-spacer v-if="!isMobile"></v-spacer>

          <v-col
            cols="12"
            sm="2"
            :class="isMobile ? 'pt-0 pb-2 px-0' : 'pa-0 mr-4'"
          >
            <v-btn
              :disabled="!isAdmin"
              block
              color="error"
              depressed
              v-if="$route.params.id"
            >
              <v-icon left>mdi-delete</v-icon>
              DELETE
            </v-btn>
          </v-col>

          <v-col cols="12" sm="2" class="pa-0">
            <v-btn block color="primary" depressed type="submit">
              <v-icon left>mdi-check</v-icon>
              SAVE
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import { mapGetters } from 'vuex';
import FlightDetails from '@/components/shared/FlightDetails';

export default {
  name: 'FlightsForm',

  components: { FlightDetails },

  data() {
    return {
      flightData: {
        date: new Date().toISOString().substr(0, 10),
        handOver: '',
      },
      flightDataRules: {},
      isFlightDataValid: false,
      isFlightDetailsValid: false,
    };
  },

  methods: {
    getFlightDetails(flightDetails) {
      Object.keys(flightDetails).forEach(key => {
        this.flightData[key] = flightDetails[key];
      });
    },

    submitFlightData() {
      console.log(JSON.stringify(this.flightData, null, 2));
    },

    validateFlightData() {
      const flightDetailsForm = this.$refs.flightDetailsForm;

      flightDetailsForm.validateFlightDetails();

      flightDetailsForm.$nextTick(() => {
        if (flightDetailsForm.$refs.form.validate()) {
          const flightDetails = flightDetailsForm.flightDetails;

          Object.keys(flightDetails).forEach(key => {
            this.flightData[key] = flightDetails[key];
          });

          this.flightDataRules = {
            required: [v => !!v || 'Required.'],
          };

          this.$nextTick(() => {
            if (this.$refs.flightForm.validate()) {
              this.submitFlightData();
            }
          });
        }
      });
    },
  },

  computed: {
    ...mapGetters({
      isAdmin: 'auth/getIsAdmin',
    }),

    isMobile() {
      return this.$vuetify.breakpoint.xs;
    },
  },
};
</script>

<style scoped></style>
