<!--suppress ALL -->
<template>
  <v-form ref="flightForm" @submit.prevent="validateFlightData">
    <v-card class="mx-auto transparent" flat max-width="959">
      <v-stepper
        :alt-labels="$vuetify.breakpoint.mdAndUp"
        class="elevation-0 transparent"
        v-model="stepper"
      >
        <v-stepper-header class="elevation-0">
          <v-stepper-step
            :complete="stepper > 1"
            :rules="[() => isFlightDetailsValid]"
            step="1"
          >
            <small> Flight Details </small>
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="stepper > 2" step="2">
            <small> Servicing Details </small>
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="stepper > 3" step="3">
            <small>ADDs</small>
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="stepper > 4" step="4">
            <small>Last</small>
          </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <stepper-content-wrapper
            :step="1"
            :title="'Flight Details'"
            @clickNextOrSave="stepper = 2"
          >
            <flights-form-flight-details
              ref="flightDetailsForm"
              :getFlightDetails="getFlightDetails"
            ></flights-form-flight-details>
          </stepper-content-wrapper>

          <stepper-content-wrapper
            :step="2"
            :title="'Services'"
            @clickBackOrCancel="stepper = 1"
            @clickNextOrSave="stepper = 3"
          >
            <v-row class="my-0">
              <v-col cols="12">
                <v-text-field
                  dense
                  hint="minutes"
                  label="400Hz"
                  outlined
                  persistent-hint
                  type="number"
                  v-model="flightData.services.afac"
                ></v-text-field>
                <v-checkbox class="mt-0" label="Water"></v-checkbox>
                <v-checkbox class="mt-0" label="Lavatory"></v-checkbox>
                <v-checkbox class="mt-0" label="Disinfection"></v-checkbox>
              </v-col>
            </v-row>
          </stepper-content-wrapper>

          <stepper-content-wrapper
            :step="3"
            :title="'ADDs'"
            @clickBackOrCancel="stepper = 2"
            @clickNextOrSave="stepper = 4"
          >
            <v-row class="my-0">
              <v-col
                class="py-0"
                cols="12"
                v-for="deferral in deferralsList"
                :key="deferral.key"
              >
                <v-text-field
                  dense
                  outlined
                  v-model="flightData.deferrals[deferral.key]"
                  type="number"
                  :label="deferral.label"
                ></v-text-field>
              </v-col>
            </v-row>
          </stepper-content-wrapper>

          <stepper-content-wrapper
            :step="4"
            :title="'Last Step'"
            :is-last-step="true"
            @clickBackOrCancel="stepper = 3"
            @clickNextOrSave="validateFlightData"
          >
            <p>Last Step</p>
          </stepper-content-wrapper>
        </v-stepper-items>
      </v-stepper>
    </v-card>
  </v-form>
</template>

<script>
import { mapGetters } from 'vuex';

import FlightsFormFlightDetails from '@/components/flights/FlightsFormFlightDetails';
import StepperContentWrapper from '@/components/shared/StepperContentWrapper';

export default {
  name: 'FlightsForm',

  components: {
    FlightsFormFlightDetails,
    StepperContentWrapper,
  },

  data() {
    return {
      deferralsList: [
        { key: 'padd', label: 'PADD' },
        { key: 'sadd', label: 'SADD' },
        { key: 'add', label: 'ADD' },
        { key: 'zadd', label: 'ZADD' },
        { key: 'cadd', label: 'CADD' },
        { key: 'madd', label: 'MADD' },
        { key: 'worked', label: 'Worked' },
      ],
      flightData: {
        date: new Date().toISOString().substr(0, 10),
        deferrals: {
          padd: 0,
          sadd: 0,
          add: 0,
          zadd: 0,
          cadd: 0,
          madd: 0,
          worked: 0,
        },
        handOver: '',
        services: {
          afac: 0,
          water: false,
          lavatory: false,
          disinfection: false,
        },
      },
      flightDataRules: {},
      hasDoneDeferrals: false,
      isFlightDetailsValid: true,
      stepper: 1,
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
          this.isFlightDetailsValid = true;
          const flightDetails = flightDetailsForm.flightDetails;

          this.getFlightDetails(flightDetails);

          this.flightDataRules = {
            required: [v => !!v || 'Required.'],
          };

          this.$nextTick(() => {
            if (this.$refs.flightForm.validate()) {
              this.submitFlightData();
            }
          });
        } else this.isFlightDetailsValid = false;
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

<style scoped>
.transparent {
  background-color: transparent;
}
::v-deep .v-stepper__step {
  padding: 16px;
}
::v-deep .row {
  margin: -8px;
}
::v-deep .col-12,
.col-6,
.col-sm-2,
.col-sm-3,
.col-sm-4,
.col-sm-6 {
  padding: 8px;
}
</style>
