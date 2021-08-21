<template>
  <v-container class="pa-0" style="max-width: 960px">
    <ConfirmDialog
      @action="onDeleteStationHandoverRecord"
      ref="confirmDialog"
      subtitle="This station handover record will be deleted."
      title="Do you want to proceed?"
    />

    <v-form ref="form" @submit.prevent="onSubmitForm">
      <div class="mb-4">
        <span class="title">Station Handover Form</span>
      </div>

      <v-card class="mb-4 shadow">
        <FlightFormTitleWrapper title="Details" />

        <v-card-text>
          <v-row>
            <v-col
              :cols="item.xs"
              :key="item.name"
              :sm="item.sm"
              v-for="item in stationHandoverFormFields"
            >
              <component
                :is="item.type"
                :hint="item.hint"
                :items="item.items"
                :label="item.label"
                :number="item.number"
                :rules="item.rules"
                :time="item.time"
                :upper-case="item.upperCase"
                @change="onChange(item.name)"
                v-if="shouldShow(item.name)"
                v-model="stationHandoverRecord[item.name]"
              />
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="pb-4 pt-0 px-4">
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
            <v-btn @click="onResetForm" class="shadow mr-4" color="secondary">
              Cancel
            </v-btn>

            <v-btn class="shadow" color="primary" type="submit">Save</v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-container>
</template>

<script>
// Import modules
import { mapActions, mapGetters } from 'vuex';

// Import components
import ConfirmDialog from '@/components/shared/ConfirmDialog';
import FlightFormTitleWrapper from '@/components/flights/FlightFormTitleWrapper';
import InputAutocomplete from '@/components/shared/input/InputAutocomplete';
import InputCheckbox from '@/components/shared/input/InputCheckbox';
import InputDate from '@/components/shared/input/InputDate';
import InputTextarea from '@/components/shared/input/InputTextarea';

// Import helpers
import { stationHandoverFormDefaultValues } from '@/features/station-handover/helpers/station-handover-form-default-values';
import { stationHandoverFormFields } from '@/features/station-handover/helpers/station-handover-form-fields';
// import { stationHandoverFormRules } from '@/features/station-handover/helpers/station-handover-form-rules';

// Import store types
import {
  addStationHandoverRecord,
  getStationHandoverRecordByID,
  updateStationHandoverRecord,
} from '@/store/modules/stationHandoverRecord/stationHandoverRecordTypes';

// Import utils
import { currentDate } from '@/utils/currentDate';

export default {
  name: 'StationHandoverForm',

  components: {
    ConfirmDialog,
    FlightFormTitleWrapper,
    InputAutocomplete,
    InputCheckbox,
    InputDate,
    InputTextarea,
  },

  data() {
    return {
      stationHandoverRecord: { ...stationHandoverFormDefaultValues },
      stationHandoverFormFields: [...stationHandoverFormFields],
      stationHandoverFormRules: {},
    };
  },

  methods: {
    ...mapActions({
      addStationHandoverRecord,
      updateStationHandoverRecord,
      setErrorMessage: 'error/setErrorMessage',
      setIsError: 'error/setIsError',
      setShouldLoading: 'setShouldLoading',
    }),

    currentDate,

    onAcknowledgedChange() {
      this.stationHandoverRecord.acknowledgedBy = '';
      this.stationHandoverRecord.acknowledgedDate = this.currentDate();
    },

    onChange(name) {
      if (name === 'isAcknowledged') {
        this.onAcknowledgedChange();
      }
    },

    onDeleteStationHandoverRecord() {},

    onResetForm() {
      this.stationHandoverFormRules = {};
      this.stationHandoverRecord = { ...stationHandoverFormDefaultValues };

      this.$nextTick(() => {
        this.$router.replace('/station-handover');
      });
    },

    onSubmitForm() {
      // this.flightRules = { ...flightFormRules };

      // Object.keys(this.flightRules).forEach(key => {
      //   this.flightDetailFields.forEach(field => {
      //     if (field.name === key) {
      //       field.rules = this.flightRules[key];
      //     }
      //   });

      //   this.flightHandlingByFields.forEach(field => {
      //     if (field.name === key) {
      //       field.rules = this.flightRules[key];
      //     }
      //   });
      // });

      this.$nextTick(async () => {
        if (this.$refs.form.validate()) {
          this.setShouldLoading(true);

          // this.flight.prefix = this.prefix;
          // this.flight.acreg = this.prefix.concat(this.flight.tail);

          let stationHandoverRecord;
          try {
            if (this.$route.params.id) {
              stationHandoverRecord = await this.updateStationHandoverRecord(
                this.stationHandoverRecord
              );
            } else {
              stationHandoverRecord = await this.addStationHandoverRecord(
                this.stationHandoverRecord
              );
            }
          } catch (error) {
            this.setShouldLoading(false);

            this.setIsError();
            this.setErrorMessage(error.message);
          }

          if (!stationHandoverRecord) {
            this.setShouldLoading(false);
            return;
          }

          this.setShouldLoading(false);
          this.onResetForm();
        }
      });
    },

    shouldShow(name) {
      if (name === 'acknowledgedBy' && !this.isAcknowledged) return false;
      if (name === 'acknowledgedDate' && !this.isAcknowledged) return false;

      return true;
    },
  },

  computed: {
    ...mapGetters({
      admin: 'auth/getIsAdmin',
      getStationHandoverRecordByID,
    }),

    isAcknowledged() {
      return this.stationHandoverRecord.isAcknowledged;
    },
  },

  created() {
    if (this.$route.params.id) {
      this.stationHandoverRecord = this.getStationHandoverRecordByID(
        this.$route.params.id
      );
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
