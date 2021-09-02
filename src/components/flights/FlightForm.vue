<template>
  <v-container class="pa-0" style="max-width: 960px">
    <confirm-dialog
      @action="handleDeleteFlight"
      ref="confirmDialog"
      subtitle="This flight will be deleted."
      title="Do you want to proceed?"
    />

    <v-form ref="form" @submit.prevent="submitForm">
      <div class="mb-4">
        <span class="title">Flight Movement Form</span>
      </div>

      <v-card class="mb-4 shadow">
        <flight-form-title-wrapper title="Flight Details" />

        <v-card-text>
          <!--Flight Details-->
          <v-row>
            <v-col
              :cols="item.xs"
              :key="item.name"
              :sm="item.sm"
              v-for="item in flightDetailFields"
            >
              <component
                :is="item.type"
                :hint="item.hint"
                :items="item.items"
                :label="item.label"
                :prefix="item.prefix ? prefix : undefined"
                :rules="item.rules"
                :time="item.time"
                :upper-case="item.upperCase"
                @change="item.name === 'airline' ? onAirlineChange() : null"
                v-model="flight[item.name]"
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!--Flight Services-->
      <v-card class="mb-4 shadow">
        <flight-form-title-wrapper title="Flight Services" />

        <v-card-text>
          <v-row>
            <v-col cols="12" sm="3">
              <input-text
                hint="Optional"
                label="400 Hz. (minutes)"
                number
                v-model="flight.afac"
              />
            </v-col>

            <v-col cols="12" sm="3">
              <input-checkbox
                hint="Optional"
                label="Water"
                v-model="flight.water"
              />
            </v-col>

            <v-col cols="12" sm="3">
              <input-checkbox
                hint="Optional"
                label="Lavatory"
                v-model="flight.lavatory"
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!--Extra Ground Equipments-->
      <flight-form-extra-ground-equipment
        :rules="flightRules.extraGroundEquipments"
        @appendFieldArray="appendFieldArray"
        @removeFieldArray="removeFieldArray"
        v-model="flight.extraGroundEquipments"
      />

      <!--Completed tasks-->
      <flight-form-completed-task
        :rules="flightRules.tasks"
        @appendFieldArray="appendFieldArray"
        @removeFieldArray="removeFieldArray"
        v-model="flight.tasks"
      />

      <!--Chargeable services / equipments-->
      <flight-form-chargeable-service
        :rules="flightRules.chargeableServices"
        @appendFieldArray="appendFieldArray"
        @removeFieldArray="removeFieldArray"
        v-model="flight.chargeableServices"
      />

      <!--Assigned delay codes-->
      <flight-form-assigned-delay
        :rules="flightRules.assignedDelays"
        @appendFieldArray="appendFieldArray"
        @removeFieldArray="removeFieldArray"
        @setDelayCategory="setDelayCategory"
        v-model="flight.assignedDelays"
      />

      <!--Handling by-->
      <v-card class="shadow">
        <flight-form-title-wrapper title="Handling By" />

        <v-card-text class="pb-0">
          <v-row>
            <v-col
              :cols="item.xs"
              :key="item.name"
              :sm="item.sm"
              v-for="item in flightHandlingByFields"
            >
              <component
                :clearable="item.clearable"
                :is="item.type"
                :hint="item.hint"
                :items="item.items"
                :label="item.label"
                :prefix="item.prefix ? prefix : undefined"
                :rules="item.rules"
                :time="item.time"
                :upper-case="item.upperCase"
                @change="onChange(item.name)"
                v-if="shouldShow(item.name)"
                v-model="flight[item.name]"
              />
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="pa-4">
          <div>
            <v-btn
              :disabled="!admin || !$route.params.id"
              @click="$refs.confirmDialog.dialog = true"
              class="shadow"
              color="error"
            >
              Delete
            </v-btn>
          </div>

          <v-spacer />

          <div>
            <v-btn @click="resetForm" class="shadow mr-4" color="secondary"
              >Cancel</v-btn
            >

            <v-btn class="shadow" color="primary" type="submit">Save</v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-container>
</template>

<script>
import { cloneDeep } from 'lodash';
import { mapActions, mapGetters } from 'vuex';

import ConfirmDialog from '@/components/shared/ConfirmDialog';
import FlightFormTitleWrapper from '@/components/flights/FlightFormTitleWrapper';
import FlightFormAssignedDelay from '@/components/flights/FlightFormAssignedDelay';
import FlightFormChargeableService from '@/components/flights/FlightFormChargeableService';
import FlightFormExtraGroundEquipment from '@/components/flights/FlightFormExtraGroundEquipment';
import FlightFormCompletedTask from '@/components/flights/FlightFormCompletedTask';
import InputCheckbox from '@/components/shared/input/InputCheckbox';
import InputAutocomplete from '@/components/shared/input/InputAutocomplete';
import InputCombo from '@/components/shared/input/InputCombo';
import InputDate from '@/components/shared/input/InputDate';
import InputSelect from '@/components/shared/input/InputSelect';
import InputText from '@/components/shared/input/InputText';
import InputTextarea from '@/components/shared/input/InputTextarea';

import { defaultValues } from '@/components/flights/default-values';
import {
  flightDetailFields,
  flightHandlingByFields,
} from '@/components/flights/flight-form-fields';
import { flightFormRules } from '@/components/flights/flight-form-rules';

import assignableDelayCodes from '@/assets/static-data/assignable-delay-codes.json';

// Import utils
import { IDGenerator } from '@/utils/id-generator';
import { currentDate } from '@/utils/currentDate';

export default {
  name: 'FlightForm',

  components: {
    'confirm-dialog': ConfirmDialog,
    'flight-form-assigned-delay': FlightFormAssignedDelay,
    'flight-form-chargeable-service': FlightFormChargeableService,
    'flight-form-extra-ground-equipment': FlightFormExtraGroundEquipment,
    'flight-form-completed-task': FlightFormCompletedTask,
    'flight-form-title-wrapper': FlightFormTitleWrapper,
    'input-autocomplete': InputAutocomplete,
    'input-checkbox': InputCheckbox,
    'input-combo': InputCombo,
    'input-date': InputDate,
    'input-select': InputSelect,
    'input-text': InputText,
    'input-textarea': InputTextarea,
  },

  data() {
    return {
      fieldArray: {
        assignedDelays: {
          category: '',
          code: '',
          duration: '',
          remark: '',
        },
        chargeableServices: {
          service: '',
          usage: 0,
          engineerHours: 0,
          mechanicHours: 0,
        },
        extraGroundEquipments: {
          company: '',
          equipment: '',
        },
        tasks: {
          taskNo: '',
          taskDetails: '',
          deferral: '',
          deferralNumber: '',
          deferralAction: '',
          engineerHours: 0,
          mechanicHours: 0,
        },
      },
      flight: cloneDeep(defaultValues),
      flightDetailFields: [...flightDetailFields],
      flightHandlingByFields: [...flightHandlingByFields],
      flightRules: {},
    };
  },

  methods: {
    ...mapActions({
      addFlight: 'flight/addFlight',
      deleteFlight: 'flight/deleteFlight',
      fetchFlightByID: 'flight/fetchFlightByID',
      setErrorMessage: 'error/setErrorMessage',
      setIsError: 'error/setIsError',
      setShouldLoading: 'setShouldLoading',
      updateFlight: 'flight/updateFlight',
    }),

    currentDate,

    appendFieldArray(name) {
      this.flight[name].push({
        _id: IDGenerator(),
        ...this.fieldArray[name],
      });
    },

    async handleDeleteFlight() {
      this.setShouldLoading(true);

      try {
        await this.deleteFlight(this.$route.params.id);

        this.setShouldLoading(false);

        if (this.$route.params.fromPath) {
          this.$router.replace(this.$route.params.fromPath);
        } else {
          this.$router.replace('/flights');
        }
      } catch (error) {
        this.setShouldLoading(false);

        this.setIsError();
        this.setErrorMessage(error.message);
      }
    },

    async handleFetchFlightByID(id) {
      this.setShouldLoading(true);

      try {
        const flight = await this.fetchFlightByID(id);

        if (!flight) return;

        Object.keys(flight).forEach(key => {
          this.flight[key] = flight[key];
        });

        this.setShouldLoading(false);
      } catch (error) {
        this.setShouldLoading(false);

        this.setIsError();
        this.setErrorMessage(error.message);
      }
    },

    findDelayCategory(code) {
      if (!code) return;

      const assignableDelay = assignableDelayCodes.find(
        delay => delay.code === code
      );

      return assignableDelay.category;
    },

    onAirlineChange() {
      this.flight.hasCabinDefect = false;
      this.flight.hasTechnicalDefect = false;
      this.flight.tail = '';
    },

    removeFieldArray({ id, name }) {
      this.flight[name] = this.flight[name].filter(field => field._id !== id);
    },

    resetForm() {
      this.flightRules = {};
      this.flight = cloneDeep(defaultValues);

      this.$nextTick(() => {
        if (this.$route.params.fromPath) {
          this.$router.replace(this.$route.params.fromPath);
        } else {
          this.$router.replace('/flights');
        }
      });
    },

    setDelayCategory(id) {
      this.flight.assignedDelays.forEach(delay => {
        if (delay._id === id) {
          delay.category = this.findDelayCategory(delay.code);
        }
      });
    },

    submitForm() {
      this.flightRules = { ...flightFormRules };

      Object.keys(this.flightRules).forEach(key => {
        this.flightDetailFields.forEach(field => {
          if (field.name === key) {
            field.rules = this.flightRules[key];
          }
        });

        this.flightHandlingByFields.forEach(field => {
          if (field.name === key) {
            field.rules = this.flightRules[key];
          }
        });
      });

      this.$nextTick(async () => {
        if (this.$refs.form.validate()) {
          this.setShouldLoading(true);

          this.flight.acreg = this.prefix.concat(this.flight.tail);
          this.flight.prefix = this.prefix;

          let flight;
          try {
            if (this.$route.params.id) {
              flight = await this.updateFlight(this.flight);
            } else {
              flight = await this.addFlight(this.flight);
            }
          } catch (error) {
            this.setShouldLoading(false);

            this.setIsError();
            this.setErrorMessage(error.message);
          }

          if (!flight) {
            this.setShouldLoading(false);
            return;
          }

          this.setShouldLoading(false);
          this.resetForm();
        }
      });
    },

    /**
     * Reset acknowledgedBy and acknowledgedDate values
     */
    onAcknowledgedChange() {
      this.flight.acknowledgedBy = '';

      this.isAcknowledged
        ? (this.flight.acknowledgedDate = this.currentDate())
        : (this.flight.acknowledgedDate = '');
    },

    /**
     * Reset remark related fields
     */
    onRemarkChange() {
      if (!this.flight.remark) {
        this.acknowledgedDate = this.currentDate();
        this.flight.acknowledgedBy = '';
        this.flight.isAcknowledged = false;
      }
    },

    /**
     * Check field name and invoke related function
     */
    onChange(name) {
      if (name === 'isAcknowledged') {
        this.onAcknowledgedChange();
      }
    },
  },

  computed: {
    ...mapGetters({
      admin: 'auth/getIsAdmin',
    }),

    prefix() {
      switch (this.flight.airline) {
        case 'ASL':
          return 'EI-';
        case 'PR':
          return 'RP-C';
        case 'CX':
        case 'KA':
        case 'LD':
          return 'B-';
        default:
          return '';
      }
    },

    isAcknowledged() {
      return this.flight.isAcknowledged;
    },

    shouldShow() {
      return function (name) {
        if (name === 'acknowledgedBy' && !this.isAcknowledged) return false;
        if (name === 'acknowledgedDate' && !this.isAcknowledged) return false;
        if (name === 'isAcknowledged' && !this.flight.remark) return false;
        if (name === 'hasCabinDefect' && this.flight.airline !== 'PR')
          return false;
        if (name === 'hasTechnicalDefect' && this.flight.airline !== 'PR')
          return false;

        return true;
      };
    },
  },

  watch: {
    flight: {
      deep: true,
      handler(flight) {
        if (!flight.remark) {
          this.onRemarkChange();
        }
      },
    },
  },

  created() {
    if (this.$route.params.id) {
      this.handleFetchFlightByID(this.$route.params.id);
    }
  },
};
</script>

<style lang="scss" scoped>
::v-deep .row {
  margin: -8px;
}

::v-deep .col-12,
.col-sm-2,
.col-sm-3,
.col-sm-4 {
  padding: 0 8px;
}
</style>
