<template>
  <v-form ref="flightForm" @submit.prevent="validateFlightData">
    <v-card class="mx-auto" max-width="959" outlined>
      <v-stepper
        :alt-labels="$vuetify.breakpoint.mdAndUp"
        class="elevation-0"
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
            <small>ADDs and Work packages</small>
          </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content class="pa-4" step="1">
            <FlightDetails
              ref="flightDetailsForm"
              :getFlightDetails="getFlightDetails"
            />

            <div class="d-flex justify-space-between">
              <v-btn color="primary" outlined> Cancel</v-btn>

              <v-btn color="primary" @click="stepper = 2"> Continue</v-btn>
            </div>
          </v-stepper-content>

          <v-stepper-content class="pa-4" step="2">
            <v-row class="mb-0">
              <v-col cols="12">
                <span class="subtitle-2">Service Details</span>

                <v-divider class="mb-4"></v-divider>
              </v-col>

              <v-col cols="12" sm="3">
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

            <div class="d-flex justify-space-between">
              <v-btn outlined color="primary" @click="stepper = 1"> BACK</v-btn>

              <v-btn color="primary" @click="stepper = 3">CONTINUE</v-btn>
            </div>
          </v-stepper-content>

          <v-stepper-content class="pa-4" step="3">
            <v-card>
              <v-card-text class="pa-0">
                <v-row class="mb-0">
                  <v-col cols="12">
                    <v-icon
                      class="mr-2"
                      color="primary"
                      large
                      v-if="!hasDoneDeferrals"
                      @click="clickAddDeferral"
                    >
                      mdi-plus-circle-outline
                    </v-icon>

                    <v-icon
                      class="mr-2"
                      color="error"
                      large
                      v-if="hasDoneDeferrals"
                      @click="hasDoneDeferrals = false"
                    >
                      mdi-minus-circle-outline
                    </v-icon>

                    <span class="subtitle-2"> ADDs </span>

                    <v-divider class="mb-4"></v-divider>
                  </v-col>
                </v-row>

                <v-row v-if="flightData.deferrals.length > 0">
                  <v-col
                    cols="6"
                    v-for="deferral in flightData.deferrals"
                    :key="deferral._id"
                  >
                    <v-select
                      dense
                      outlined
                      label="ADD type"
                      v-model="deferral.type"
                      :items="deferralTypes"
                    ></v-select>

                    <v-text-field
                      dense
                      outlined
                      label="amounts"
                      type="number"
                      v-model="deferral.amount"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-card-text>

              <v-card-actions class="pa-0 d-flex justify-space-between">
                <v-btn outlined color="primary" @click="stepper = 2">
                  BACK
                </v-btn>

                <v-btn color="primary" @click="validateFlightData">
                  SAVE
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>

          <v-stepper-content class="pa-4" step="4">
            <div class="d-flex justify-space-between">
              <v-btn outlined color="primary" @click="stepper = 3"> BACK</v-btn>

              <v-btn color="primary" @click="validateFlightData">SAVE</v-btn>
            </div>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card>
  </v-form>
</template>

<script>
import FlightDetails from '@/components/shared/FlightDetails';
import { generateObjectID } from '@/utils/object-id';
import { mapGetters } from 'vuex';

export default {
  name: 'FlightsForm',

  components: { FlightDetails },

  data() {
    return {
      deferral: {
        _id: generateObjectID(),
        type: '',
        amount: 0,
      },
      deferralTypes: ['P', 'S', 'A', 'Z', 'Z', 'W'],
      flightData: {
        date: new Date().toISOString().substr(0, 10),
        handOver: '',
        services: {
          afac: 0,
          water: false,
          lavatory: false,
          disinfection: false,
        },
        deferrals: [],
      },
      flightDataRules: {},
      hasDoneDeferrals: false,
      isFlightDetailsValid: true,
      stepper: 3,
    };
  },

  methods: {
    clickAddDeferral() {
      this.hasDoneDeferrals = true;
      this.flightData.deferrals.push(this.deferral);
    },

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

<style scoped></style>
