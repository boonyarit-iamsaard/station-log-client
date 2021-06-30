<template>
  <v-container class="pa-0" style="max-width: 959px">
    <v-form ref="form" @submit.prevent="submitForm">
      <ConfirmDialog
        :subtitle="'This record would be deleted!'"
        :title="'Do you want to proceed?'"
        @action="handleDeleteSpare"
        ref="confirmDeleteDialog"
      />

      <div class="mb-4">
        <span class="title">Spare Movement Form</span>
      </div>

      <v-card class="shadow">
        <v-card-text>
          <!-- Flight details -->
          <v-row class="mt-0">
            <v-col cols="12">
              <span class="subtitle-1">Flight Details</span>

              <v-divider class="mb-4"></v-divider>
            </v-col>

            <v-col cols="12" sm="4">
              <v-dialog
                ref="dialog"
                v-model="modal"
                :return-value.sync="formData.date"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    :value="formData.date | formatDate"
                    append-icon="mdi-calendar"
                    dense
                    label="Date"
                    outlined
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>

                <v-date-picker v-model="formData.date" scrollable>
                  <v-spacer />

                  <v-btn text color="primary" @click="modal = false">
                    Cancel
                  </v-btn>

                  <v-btn
                    text
                    color="primary"
                    @click="$refs.dialog.save(formData.date)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>

            <v-col cols="12" sm="2">
              <v-select
                dense
                label="Airline"
                outlined
                v-model="formData.airline"
                :items="airlines"
                @change="handleAirlineChange"
              />
            </v-col>

            <v-col cols="12" sm="3">
              <v-text-field
                class="uppercase"
                dense
                label="Flt No."
                outlined
                v-model="formData.fltno"
                :rules="formRules.fltno"
                @blur="formData.fltno = formData.fltno.toUpperCase()"
              />
            </v-col>

            <v-col cols="12" sm="3">
              <v-text-field
                :prefix="formData.prefix"
                :rules="formRules.tail"
                @blur="formData.tail = formData.tail.toUpperCase()"
                class="uppercase"
                dense
                label="Reg."
                outlined
                v-model="formData.tail"
              ></v-text-field>
            </v-col>
          </v-row>

          <!-- Spare details -->
          <v-row>
            <v-col cols="12">
              <span class="subtitle-1">Spare Details</span>

              <v-divider class="mb-4" />
            </v-col>

            <v-col cols="12">
              <v-radio-group
                :row="$vuetify.breakpoint.smAndUp"
                @change="handleSpareTypeChange"
                class="mt-0"
                dense
                label="Type"
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
              <v-text-field
                :rules="formRules.part"
                @blur="formData.part = formData.part.toUpperCase()"
                class="uppercase"
                dense
                label="Part No."
                outlined
                v-model="formData.part"
              />
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                :rules="formRules.desc"
                @blur="formData.desc = formData.desc.toUpperCase()"
                class="uppercase"
                dense
                label="Description"
                outlined
                v-model="formData.desc"
              />
            </v-col>

            <v-col cols="12" sm="4">
              <v-text-field
                :rules="formRules.serial"
                @blur="formData.serial = formData.serial.toUpperCase()"
                class="uppercase"
                dense
                label="Serial No."
                outlined
                v-model="formData.serial"
              />
            </v-col>

            <v-col cols="12" sm="4">
              <v-text-field
                :rules="formRules.grn"
                @blur="formData.grn = formData.grn.toUpperCase()"
                class="uppercase"
                counter="10"
                dense
                label="GRN."
                outlined
                v-model="formData.grn"
              />
            </v-col>

            <v-col cols="12" sm="4">
              <v-text-field
                :rules="formRules.qty"
                dense
                label="QTY."
                outlined
                type="number"
                v-model="formData.qty"
              />
            </v-col>

            <v-col cols="12" sm="4">
              <v-select
                :items="stores"
                dense
                label="Store"
                outlined
                v-model="formData.store"
              />
            </v-col>

            <v-col cols="12" sm="4">
              <v-select
                :items="staffs"
                :rules="formRules.usedBy"
                dense
                label="Used By"
                outlined
                v-model="formData.usedBy"
              />
            </v-col>
          </v-row>

          <!-- Spare actions -->
          <v-row>
            <v-col cols="12">
              <span class="subtitle-1">Spare Actions</span>

              <v-divider class="mb-4"></v-divider>
            </v-col>

            <!-- Issued -->
            <v-col cols="12" :sm="formData.issued.status ? 3 : 12">
              <v-checkbox
                :disabled="formData.returned.status || !isAdmin"
                @change="handleSpareActionChange('issued')"
                dense
                label="Issued?"
                v-model="formData.issued.status"
              />
            </v-col>

            <v-col cols="12" sm="3" v-if="formData.issued.status">
              <v-text-field
                :disabled="formData.returned.status || !isAdmin"
                :rules="formRules.issuedNumber"
                @blur="
                  formData.issued.number = formData.issued.number.toUpperCase()
                "
                class="uppercase"
                dense
                label="IS No."
                outlined
                v-model="formData.issued.number"
              />
            </v-col>

            <v-col cols="12" sm="3" v-if="formData.issued.status">
              <v-select
                :disabled="formData.returned.status || !isAdmin"
                :items="staffs"
                :rules="formRules.issuedBy"
                dense
                label="By"
                outlined
                v-model="formData.issued.by"
              />
            </v-col>

            <v-col cols="12" sm="3" v-if="formData.issued.status">
              <DatePicker
                ref="issuedDate"
                :disabled="formData.returned.status"
                :provided-date="
                  formData.issued.date
                    ? formData.issued.date
                    : new Date().toISOString().substr(0, 10)
                "
              />
            </v-col>

            <!-- Returned -->
            <v-col
              :sm="formData.returned.status ? 3 : 12"
              cols="12"
              v-if="formData.type === 'Return' && formData.issued.status"
            >
              <v-checkbox
                :disabled="formData.transferred.status || !isAdmin"
                @change="handleSpareActionChange('returned')"
                dense
                label="Returned?"
                v-model="formData.returned.status"
              />
            </v-col>

            <v-col cols="12" sm="3" v-if="formData.returned.status">
              <v-text-field
                :disabled="formData.transferred.status || !isAdmin"
                :rules="formRules.returnedNumber"
                @blur="
                  formData.returned.number = formData.returned.number.toUpperCase()
                "
                class="uppercase"
                dense
                label="IR No."
                outlined
                v-model="formData.returned.number"
              />
            </v-col>

            <v-col cols="12" sm="3" v-if="formData.returned.status">
              <v-select
                :disabled="formData.transferred.status || !isAdmin"
                :items="staffs"
                :rules="formRules.returnedBy"
                dense
                label="By"
                outlined
                v-model="formData.returned.by"
              />
            </v-col>

            <v-col cols="12" sm="3" v-if="formData.returned.status">
              <DatePicker
                :disabled="formData.transferred.status"
                ref="returnedDate"
              />
            </v-col>

            <!-- Transferred -->
            <v-col
              :sm="formData.transferred.status ? 3 : 12"
              cols="12"
              v-if="
                formData.type === 'Return' &&
                formData.issued.status &&
                formData.returned.status
              "
            >
              <v-checkbox
                :disabled="!isAdmin"
                @change="handleSpareActionChange('transferred')"
                dense
                label="Transferred?"
                v-model="formData.transferred.status"
              />
            </v-col>

            <v-col cols="12" sm="3" v-if="formData.transferred.status">
              <v-text-field
                :disabled="!isAdmin"
                :rules="formRules.transferredNumber"
                @blur="
                  formData.transferred.number = formData.transferred.number.toUpperCase()
                "
                class="uppercase"
                dense
                label="TX No."
                outlined
                v-model="formData.transferred.number"
              />
            </v-col>

            <v-col cols="12" sm="3" v-if="formData.transferred.status">
              <v-select
                :disabled="!isAdmin"
                :items="staffs"
                :rules="formRules.transferredBy"
                dense
                label="By"
                outlined
                v-model="formData.transferred.by"
              />
            </v-col>

            <v-col cols="12" sm="3" v-if="formData.transferred.status">
              <DatePicker ref="transferredDate" />
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="px-4 pt-0 pb-4">
          <v-row class="ma-0">
            <v-col
              cols="12"
              sm="2"
              :class="isMobile ? 'pt-0 pb-2 px-0' : 'pa-0'"
            >
              <v-btn block color="secondary" class="shadow" @click="resetForm">
                <v-icon left>mdi-close</v-icon>
                Cancel
              </v-btn>
            </v-col>

            <v-spacer v-if="!isMobile" />

            <v-col
              cols="12"
              sm="2"
              :class="isMobile ? 'pt-0 pb-2 px-0' : 'pa-0 mr-4'"
            >
              <v-btn
                block
                class="shadow"
                color="error"
                :disabled="!isAdmin"
                @click="$refs.confirmDeleteDialog.dialog = true"
                v-if="$route.params.id"
              >
                <v-icon left>mdi-delete</v-icon>
                Delete
              </v-btn>
            </v-col>

            <v-col cols="12" sm="2" class="pa-0">
              <v-btn block class="shadow" color="primary" type="submit">
                <v-icon left>mdi-check</v-icon>
                Save
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-container>
</template>

<script>
import { cloneDeep } from 'lodash';
import { format } from 'date-fns';
import { mapActions, mapGetters } from 'vuex';

import ConfirmDialog from '@/components/shared/ConfirmDialog';
import DatePicker from '@/components/shared/DatePicker';
import { spareData } from '@/components/spares/default-values';
import { staffs } from '@/utils/staffs';

export default {
  name: 'SparesForm',

  components: { DatePicker, ConfirmDialog },

  data() {
    return {
      airlines: ['ASL', 'CX', 'KA', 'LD', 'PR'],
      formData: cloneDeep(spareData),
      formRules: {},
      modal: false,
      staffs: staffs(),
      stores: ['BKK', 'BKK306', 'BKKAHK'],
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
      this.formRules = {
        fltno: [v => !!v || 'Flt No. is required.'],
        tail: [v => !!v || 'A/C Reg. is required.'],
        part: [v => !!v || 'Part No. is required.'],
        desc: [v => !!v || 'Description is required.'],
        serial: [v => !!v || 'Serial No. is required.'],
        grn: [
          v => !!v || 'GRN is required.',
          v => v.length >= 10 || 'GRN must contains 10 characters',
        ],
        qty: [
          v => !!v || 'QTY is required.',
          v => v >= 1 || 'QTY must not equal 0',
        ],
        usedBy: [v => !!v || 'Used By is required.'],
        issuedNumber: [v => !!v || 'IS No. is required.'],
        issuedBy: [v => !!v || 'Required.'],
        returnedNumber: [v => !!v || 'IR No. is required.'],
        returnedBy: [v => !!v || 'Required.'],
        transferredNumber: [v => !!v || 'TX No. is required.'],
        transferredBy: [v => !!v || 'Required.'],
      };

      this.$nextTick(async () => {
        if (this.$refs.form.validate()) {
          this.setShouldLoading(true);

          this.formData.acreg = this.formData.prefix.concat(this.formData.tail);
          this.formData.status = this.setSpareStatus();

          if (this.formData.issued.status) {
            this.formData.issued.date = this.$refs.issuedDate.selectedDate;
          }

          if (this.formData.returned.status) {
            this.formData.returned.date = this.$refs.returnedDate.selectedDate;
          }

          if (this.formData.transferred.status) {
            this.formData.transferred.date = this.$refs.transferredDate.selectedDate;
          }

          const submitData = this.formData;

          let spare;
          try {
            if (this.$route.params.id) {
              spare = await this.updateSpare(submitData);
            } else {
              spare = await this.addSpare(submitData);
            }
          } catch (error) {
            this.setShouldLoading(false);

            this.setIsError();
            this.setErrorMessage(error.message);
          }

          if (!spare) return;

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

        if (!spare) return;

        this.formData = cloneDeep(spare);
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
        delete this.formData[name].date;
        this.formData[name].number = '';
        this.formData[name].by = '';
      }
    },

    handleSpareTypeChange() {
      if (this.formData.type !== 'Return') {
        this.formData.returned = { status: false, number: '', by: '' };
        this.formData.transferred = { status: false, number: '', by: '' };
      }
    },

    setSpareStatus() {
      if (this.formData.type === 'Return') {
        if (this.formData.transferred.status) {
          return 'Transferred';
        } else if (
          this.formData.returned.status &&
          !this.formData.transferred.status
        ) {
          return 'Returned';
        } else if (
          this.formData.issued.status &&
          !this.formData.returned.status &&
          !this.formData.transferred.status
        ) {
          return 'Issued';
        } else return 'Pending';
      } else {
        if (this.formData.issued.status) {
          return 'Issued';
        } else return 'Pending';
      }
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

  filters: {
    formatDate: date => {
      return format(new Date(date), 'dd MMMM yyyy');
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
  padding: 7px 8px;
}
</style>
