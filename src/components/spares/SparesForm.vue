<template>
  <v-container class="pa-0" style="max-width: 960px">
    <v-form ref="form" @submit.prevent="submitForm">
      <confirm-dialog
        :subtitle="'This record would be deleted!'"
        :title="'Do you want to proceed?'"
        @action="handleDeleteSpare"
        ref="confirmDeleteDialog"
      />

      <div class="mb-4">
        <span class="title">Spare Movement Form</span>
      </div>

      <v-card class="mb-4 shadow">
        <flight-form-title-wrapper title="Flight Details" />

        <v-card-text>
          <v-row>
            <v-col cols="12" sm="4">
              <input-date v-model="formData.date" />
            </v-col>

            <v-col cols="12" sm="2">
              <input-autocomplete
                :items="airlines"
                @change="handleAirlineChange"
                label="Airline"
                v-model="formData.airline"
              />
            </v-col>

            <v-col cols="12" sm="3">
              <input-text
                :rules="formRules.fltno"
                label="Flt No."
                upper-case
                v-model="formData.fltno"
              />
            </v-col>

            <v-col cols="12" sm="3">
              <input-text
                :prefix="formData.prefix"
                :rules="formRules.tail"
                label="A/C Reg."
                upper-case
                v-model="formData.tail"
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <v-card class="mt-4 shadow">
        <flight-form-title-wrapper title="Spare Details" />

        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-radio-group
                :row="$vuetify.breakpoint.smAndUp"
                @change="handleSpareTypeChange"
                class="mt-0"
                dense
                label="Spare type"
                v-model="formData.type"
              >
                <v-radio
                  :key="type"
                  :label="type"
                  :value="type"
                  v-for="type in types"
                >
                </v-radio>
              </v-radio-group>
            </v-col>

            <v-col cols="12" sm="6">
              <input-combo
                :items="normalizedMostUsedParts"
                :rules="formRules.part"
                label="Part No."
                upper-case
                v-model="formData.part"
              />
            </v-col>

            <v-col cols="12" sm="6">
              <input-text
                :rules="formRules.desc"
                label="Description"
                upper-case
                v-model="formData.desc"
              />
            </v-col>

            <v-col cols="12" sm="4">
              <input-text
                :rules="formRules.serial"
                label="Serial No."
                upper-case
                v-model="formData.serial"
              />
            </v-col>

            <v-col cols="12" sm="4">
              <input-text
                :counter="10"
                :rules="formRules.grn"
                label="GRN."
                upper-case
                v-model="formData.grn"
              />
            </v-col>

            <v-col cols="12" sm="4">
              <input-text
                :rules="formRules.qty"
                label="QTY."
                number
                v-model="formData.qty"
              />
            </v-col>

            <v-col cols="12" sm="4">
              <input-select
                :items="stores"
                label="Store"
                v-model="formData.store"
              />
            </v-col>

            <v-col cols="12" sm="4">
              <input-select
                :items="staffs"
                :rules="formRules.usedBy"
                label="Used By"
                v-model="formData.usedBy"
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <v-card class="mt-4 shadow">
        <flight-form-title-wrapper title="Actions" />

        <v-card-text>
          <v-row>
            <v-col cols="12" :sm="issued ? 3 : 12">
              <input-checkbox
                :disabled="returned || !admin"
                @change="handleSpareActionChange('issued')"
                label="Issued?"
                v-model="formData.issued.status"
              />
            </v-col>

            <v-col cols="12" sm="3" v-if="issued">
              <input-text
                :disabled="returned || !admin"
                :rules="formRules.issuedNumber"
                label="IS No."
                upper-case
                v-model="formData.issued.number"
              />
            </v-col>

            <v-col cols="12" sm="3" v-if="issued">
              <input-select
                :disabled="returned || !admin"
                :items="staffs"
                :rules="formRules.issuedBy"
                label="By"
                v-model="formData.issued.by"
              />
            </v-col>

            <v-col cols="12" sm="3" v-if="issued">
              <input-date :disabled="returned" v-model="issuedDate" />
            </v-col>

            <!-- Returned -->
            <v-col
              :sm="returned ? 3 : 12"
              cols="12"
              v-if="returnable && issued"
            >
              <input-checkbox
                :disabled="transferred || !admin"
                @change="handleSpareActionChange('returned')"
                label="Returned?"
                v-model="formData.returned.status"
              />
            </v-col>

            <v-col cols="12" sm="3" v-if="returned">
              <input-text
                :disabled="transferred || !admin"
                :rules="formRules.returnedNumber"
                label="IR No."
                upper-case
                v-model="formData.returned.number"
              />
            </v-col>

            <v-col cols="12" sm="3" v-if="returned">
              <input-select
                :disabled="transferred || !admin"
                :items="staffs"
                :rules="formRules.returnedBy"
                label="By"
                v-model="formData.returned.by"
              />
            </v-col>

            <v-col cols="12" sm="3" v-if="returned">
              <input-date
                :disabled="transferred || !admin"
                v-model="returnedDate"
              />
            </v-col>

            <!-- Transferred -->
            <v-col
              :sm="transferred ? 3 : 12"
              cols="12"
              v-if="returnable && issued && returned"
            >
              <input-checkbox
                :disabled="!admin"
                @change="handleSpareActionChange('transferred')"
                label="Transferred?"
                v-model="formData.transferred.status"
              />
            </v-col>

            <v-col cols="12" sm="3" v-if="transferred">
              <input-text
                :disabled="!admin"
                :rules="formRules.transferredNumber"
                label="TX No."
                upper-case
                v-model="formData.transferred.number"
              />
            </v-col>

            <v-col cols="12" sm="3" v-if="transferred">
              <input-select
                :disabled="!admin"
                :items="staffs"
                :rules="formRules.transferredBy"
                label="By"
                v-model="formData.transferred.by"
              />
            </v-col>

            <v-col cols="12" sm="3" v-if="transferred">
              <input-date v-model="transferredDate" />
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="pb-4 pt-0 px-4">
          <div>
            <v-btn
              :disabled="!admin || !$route.params.id"
              @click="$refs.confirmDeleteDialog.dialog = true"
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
import { mapActions, mapGetters } from 'vuex';

import ConfirmDialog from '@/components/shared/ConfirmDialog';
import FlightFormTitleWrapper from '@/components/flights/FlightFormTitleWrapper';
import InputAutocomplete from '@/components/shared/input/InputAutocomplete';
import InputCheckbox from '@/components/shared/input/InputCheckbox';
import InputCombo from '@/components/shared/input/InputCombo';
import InputDate from '@/components/shared/input/InputDate';
import InputSelect from '@/components/shared/input/InputSelect';
import InputText from '@/components/shared/input/InputText';

import { currentDate } from '@/utils/currentDate';
import { spareData } from '@/components/spares/default-values';
import { sparesFormRules } from '@/components/spares/spares-form-rules';
import { staffs } from '@/utils/staffs';

export default {
  name: 'SparesForm',

  components: {
    'confirm-dialog': ConfirmDialog,
    'flight-form-title-wrapper': FlightFormTitleWrapper,
    'input-autocomplete': InputAutocomplete,
    'input-checkbox': InputCheckbox,
    'input-combo': InputCombo,
    'input-date': InputDate,
    'input-select': InputSelect,
    'input-text': InputText,
  },

  data() {
    return {
      airlines: ['ASL', 'CX', 'KA', 'LD', 'PR'],
      defaultSpareAction: {
        by: '',
        date: currentDate(),
        number: '',
        status: false,
      },
      formData: cloneDeep(spareData),
      formRules: {},
      issuedDate: currentDate(),
      modal: false,
      returnedDate: currentDate(),
      staffs: staffs(),
      stores: ['BKK', 'BKK306', 'BKKAHK'],
      transferredDate: currentDate(),
      types: ['Consumable', 'Fluid', 'Return'],
    };
  },

  methods: {
    ...mapActions({
      addSpare: 'spares/addSpare',
      deleteSpare: 'spares/deleteSpare',
      fetchSpareByID: 'spares/fetchSpareByID',
      setErrorMessage: 'error/setErrorMessage',
      setIsError: 'error/setIsError',
      setShouldLoading: 'setShouldLoading',
      updateSpare: 'spares/updateSpare',
    }),

    submitForm() {
      this.formRules = { ...sparesFormRules };

      this.$nextTick(async () => {
        if (this.$refs.form.validate()) {
          this.setShouldLoading(true);

          this.formData.acreg = this.formData.prefix.concat(this.formData.tail);
          this.formData.status = this.setSpareStatus();

          this.formData.issued.date = this.issuedDate;
          this.formData.returned.date = this.returnedDate;
          this.formData.transferred.date = this.transferredDate;

          let spare;
          try {
            if (this.$route.params.id) {
              spare = await this.updateSpare(this.formData);
            } else {
              spare = await this.addSpare(this.formData);
            }
          } catch (error) {
            this.setShouldLoading(false);

            this.setIsError();
            this.setErrorMessage(error.message);
          }

          if (!spare) {
            this.setShouldLoading(false);
            return;
          }

          this.setShouldLoading(false);
          this.resetForm();
        }
      });
    },

    resetForm() {
      this.formRules = {};
      this.formData = cloneDeep(spareData);

      this.$nextTick(() => {
        this.$router.replace('/spares');
      });
    },

    async handleDeleteSpare() {
      this.setShouldLoading(true);

      try {
        await this.deleteSpare(this.$route.params.id);

        this.setShouldLoading(false);

        await this.$router.replace('/spares');
      } catch (error) {
        this.setShouldLoading(false);

        this.setIsError();
        this.setErrorMessage(error.message);
      }
    },

    async handleFetchSpareByID(id) {
      this.setShouldLoading(true);

      try {
        const spare = await this.fetchSpareByID(id);

        if (!spare) {
          this.setShouldLoading(false);
          return;
        }

        this.formData = cloneDeep(spare);

        if (this.formData.issued.date) {
          this.issuedDate = this.formData.issued.date;
        }

        if (this.formData.returned.date) {
          this.returnedDate = this.formData.returned.date;
        }

        if (this.formData.transferred.date) {
          this.transferredDate = this.formData.transferred.date;
        }

        this.setShouldLoading(false);
      } catch (error) {
        this.setShouldLoading(false);

        this.setIsError();
        this.setErrorMessage(error.message);
      }
    },

    handleAirlineChange() {
      switch (this.formData.airline) {
        case 'ASL':
          this.formData.prefix = 'EI-';
          break;
        case 'PR':
          this.formData.prefix = 'RP-C';
          break;
        default:
          this.formData.prefix = 'B-';
      }
    },

    handleSpareActionChange(name) {
      if (!this.formData[name].status) {
        this.formData[name] = {
          ...this.formData[name],
          ...this.defaultSpareAction,
        };
      }

      if (name === 'issued') {
        this.issuedDate = currentDate();
      }

      if (name === 'returned') {
        this.returnedDate = currentDate();
      }

      if (name === 'transferred') {
        this.transferredDate = currentDate();
      }
    },

    handleSpareTypeChange() {
      if (!this.returnable) {
        this.returnedDate = currentDate();
        this.transferredDate = currentDate();

        this.formData.returned = {
          ...this.formData.returned,
          ...this.defaultSpareAction,
        };
        this.formData.transferred = {
          ...this.formData.transferred,
          ...this.defaultSpareAction,
        };
      }
    },

    setSpareStatus() {
      if (this.returnable) {
        if (this.transferred) return 'Transferred';

        if (this.returned && !this.transferred) return 'Returned';

        if (this.issued && !this.returned && !this.transferred) return 'Issued';

        return 'Pending';
      }

      if (this.issued) return 'Issued';

      return 'Pending';
    },
  },

  computed: {
    ...mapGetters({
      admin: 'auth/getIsAdmin',
      mostUsedParts: 'spares/getMostUsedParts',
    }),

    issued() {
      return this.formData.issued.status;
    },

    isMobile() {
      return this.$vuetify.breakpoint.xs;
    },

    normalizedMostUsedParts() {
      const mostUsedParts = [];

      this.mostUsedParts.forEach(part => mostUsedParts.push(part._id));

      return mostUsedParts;
    },

    returnable() {
      return this.formData.type === 'Return';
    },

    returned() {
      return this.formData.returned.status;
    },

    transferred() {
      return this.formData.transferred.status;
    },
  },

  created() {
    if (this.$route.params.id) {
      this.handleFetchSpareByID(this.$route.params.id);
    }

    // http://localhost:8080/spares/create?part=2197&desc=OIL&type=Fluid&store=BKK306
    if (
      this.$route.query.part &&
      this.$route.query.desc &&
      this.$route.query.type &&
      this.$route.query.store
    ) {
      this.formData.part = this.$route.query.part;
      this.formData.desc = this.$route.query.desc;
      this.formData.type = this.$route.query.type;
      this.formData.store = this.$route.query.store;
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
