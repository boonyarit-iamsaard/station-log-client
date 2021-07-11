<template>
  <v-container class="pa-0" style="max-width: 959px">
    <confirm-dialog
      @action="handleDeleteManpowerRecord"
      ref="confirmDialog"
      subtitle="This sick leave / OT record will be deleted."
      title="Do you want to proceed?"
    />

    <v-form ref="form" @submit.prevent="submitForm">
      <div class="mb-4">
        <span class="title">Sick Leave / OT Record</span>
      </div>

      <v-card class="mb-4 shadow">
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="4">
              <input-date v-model="manpowerRecord.date" />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <v-card class="mb-4 shadow">
        <flight-form-title-wrapper title="Sick Leave Requested" />

        <v-card-text>
          <v-row>
            <v-col cols="12" sm="3">
              <input-text
                label="Shift"
                upper-case
                v-model="manpowerRecord.sickLeaveDetails.shift"
              />
            </v-col>

            <v-col cols="12" sm="3">
              <input-autocomplete
                :items="staffs"
                label="Name"
                v-model="manpowerRecord.sickLeaveDetails.name"
              />
            </v-col>

            <v-col cols="12" sm="3">
              <input-autocomplete
                :items="staffs"
                label="Received by"
                v-model="manpowerRecord.sickLeaveDetails.receivedBy"
              />
            </v-col>

            <v-col cols="12">
              <input-textarea
                label="Reason"
                v-model="manpowerRecord.sickLeaveDetails.reason"
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <v-card class="mb-4 shadow">
        <flight-form-title-wrapper title="OT / Reschedule Required" />

        <v-card-text>
          <v-row>
            <v-col cols="12" sm="3">
              <input-text
                label="Shift"
                upper-case
                v-model="manpowerRecord.overTimeDetails.shift"
              />
            </v-col>

            <v-col cols="12" sm="3">
              <input-autocomplete
                :items="staffs"
                label="Name"
                v-model="manpowerRecord.overTimeDetails.name"
              />
            </v-col>

            <v-col cols="12" sm="3">
              <input-autocomplete
                :items="engineers"
                label="Required by"
                v-model="manpowerRecord.overTimeDetails.requiredBy"
              />
            </v-col>

            <v-col cols="12">
              <input-textarea
                label="Remark"
                v-model="manpowerRecord.overTimeDetails.remark"
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
            <v-btn @click="resetForm" class="shadow mr-4" color="secondary">
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
import { cloneDeep } from 'lodash';

import ConfirmDialog from '@/components/shared/ConfirmDialog';
import FlightFormTitleWrapper from '@/components/flights/FlightFormTitleWrapper';
import InputAutocomplete from '@/components/shared/input/InputAutocomplete';
import InputDate from '@/components/shared/input/InputDate';
import InputText from '@/components/shared/input/InputText';
import InputTextarea from '@/components/shared/input/InputTextarea';

import { defaultValues } from '@/components/manpower/default-values';
import { engineers, staffs } from '@/utils/staffs';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ManpowerForm',

  components: {
    'confirm-dialog': ConfirmDialog,
    'flight-form-title-wrapper': FlightFormTitleWrapper,
    'input-autocomplete': InputAutocomplete,
    'input-date': InputDate,
    'input-text': InputText,
    'input-textarea': InputTextarea,
  },

  data() {
    return {
      engineers: engineers(),
      manpowerRecord: cloneDeep(defaultValues),
      staffs: staffs(),
    };
  },

  methods: {
    ...mapActions({
      addManpowerRecord: 'manpower/addManpowerRecord',
      deleteManpowerRecord: 'manpower/deleteManpowerRecord',
      fetchManpowerRecordsByID: 'manpower/fetchManpowerRecordsByID',
      setErrorMessage: 'error/setErrorMessage',
      setIsError: 'error/setIsError',
      setShouldLoading: 'setShouldLoading',
      updateManpowerRecord: 'manpower/updateManpowerRecord',
    }),

    async handleDeleteManpowerRecord() {
      this.setShouldLoading(true);

      try {
        await this.deleteManpowerRecord(this.$route.params.id);

        this.setShouldLoading(false);

        await this.$router.replace('/manpower');
      } catch (error) {
        this.setShouldLoading(false);

        this.setIsError();
        this.setErrorMessage(error.message);
      }
    },

    async handleFetchManpowerRecordByID(id) {
      this.setShouldLoading(true);

      try {
        const manpowerRecord = await this.fetchManpowerRecordsByID(id);

        if (!manpowerRecord) return;

        this.manpowerRecord = cloneDeep(manpowerRecord);
        this.setShouldLoading(false);
      } catch (error) {
        this.setShouldLoading(false);

        this.setIsError();
        this.setErrorMessage(error.message);
      }
    },

    resetForm() {
      this.manpowerRecord = cloneDeep(defaultValues);

      this.$nextTick(() => {
        this.$router.replace('/manpower');
      });
    },

    async submitForm() {
      this.setShouldLoading(true);

      let manpowerRecord;
      try {
        if (this.$route.params.id) {
          manpowerRecord = await this.updateManpowerRecord(this.manpowerRecord);
        } else {
          manpowerRecord = await this.addManpowerRecord(this.manpowerRecord);
        }
      } catch (error) {
        this.setShouldLoading(false);

        this.setIsError();
        this.setErrorMessage(error.message);
      }

      if (!manpowerRecord) {
        this.setShouldLoading(false);
        return;
      }

      this.setShouldLoading(false);
      this.resetForm();
    },
  },

  computed: {
    ...mapGetters({
      admin: 'auth/getIsAdmin',
    }),

    overTimeRequired() {
      return this.manpowerRecord.overTimeRequired;
    },

    sickLeaveRequested() {
      return this.manpowerRecord.sickLeaveRequested;
    },
  },

  created() {
    if (this.$route.params.id) {
      this.handleFetchManpowerRecordByID(this.$route.params.id);
    }
  },
};
</script>

<style lang="scss" scoped>
/*noinspection CssUnusedSymbol*/
::v-deep .row {
  margin: -8px;
}

/*noinspection CssUnusedSymbol*/
::v-deep .col-12,
.col-sm-2,
.col-sm-3,
.col-sm-4 {
  padding: 0 8px;
}
</style>
