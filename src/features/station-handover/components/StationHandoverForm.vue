<template>
  <v-container class="pa-0" style="max-width: 960px">
    <ConfirmDialog
      @action="onDeleteStationHandoverRecord"
      ref="confirmDialog"
      subtitle="This station handover record will be deleted."
      title="Do you want to proceed?"
    />

    <v-form ref="form" @submit.prevent="submitForm">
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
import { mapGetters } from 'vuex';

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
    },

    onSubmitForm() {},

    shouldShow(name) {
      if (name === 'acknowledgedBy' && !this.isAcknowledged) return false;
      if (name === 'acknowledgedDate' && !this.isAcknowledged) return false;

      return true;
    },
  },

  computed: {
    ...mapGetters({
      admin: 'auth/getIsAdmin',
    }),

    isAcknowledged() {
      return this.stationHandoverRecord.isAcknowledged;
    },
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
