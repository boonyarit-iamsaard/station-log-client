<template>
  <v-form ref="form" @submit.prevent="onFormSubmit">
    <SharedDialog
      ref="confirmDeleteDialog"
      :title="'Do you want to proceed?'"
      :subtitle="'This record would be deleted!'"
      @action="onDeleteSpare"
    />

    <v-overlay absolute :value="isLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <v-card
      class="mx-auto"
      max-width="959"
      :flat="$vuetify.breakpoint.smAndDown"
      :outlined="$vuetify.breakpoint.mdAndUp"
    >
      <v-card-text>
        <!-- Flight details -->
        <v-row class="mt-0">
          <v-col cols="12">
            <span>Flight Details</span>

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
                  append-icon="mdi-calendar"
                  dense
                  label="Date"
                  outlined
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  :value="setDateFormatHandler(formData.date)"
                ></v-text-field>
              </template>
              <v-date-picker v-model="formData.date" scrollable>
                <v-spacer></v-spacer>
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
              @change="onAirlineChangeHandler"
            ></v-select>
          </v-col>

          <v-col cols="12" sm="3">
            <v-text-field
              dense
              label="Flt No."
              outlined
              v-model="formData.fltno"
              :rules="formRules.fltno"
              @keyup="setUpperCaseTextHandler('fltno')"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="3">
            <v-text-field
              dense
              label="Reg."
              outlined
              v-model="formData.tail"
              :prefix="formData.prefix"
              :rules="formRules.tail"
              @keyup="setUpperCaseTextHandler('tail')"
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- Spare details -->
        <v-row>
          <v-col cols="12">
            <span>Spare Details</span>

            <v-divider class="mb-4"></v-divider>
          </v-col>

          <v-col cols="12">
            <v-radio-group
              dense
              class="mt-0"
              label="Type"
              v-model="formData.type"
              :row="$vuetify.breakpoint.smAndUp"
              @change="onTypeChangeHandler"
            >
              <v-radio
                v-for="type in types"
                :key="type"
                :label="type"
                :value="type"
              >
              </v-radio>
            </v-radio-group>
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              dense
              label="Part No."
              outlined
              v-model="formData.part"
              :rules="formRules.part"
              @keyup="setUpperCaseTextHandler('part')"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              dense
              label="Description"
              outlined
              v-model="formData.desc"
              :rules="formRules.desc"
              @keyup="setUpperCaseTextHandler('desc')"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="4">
            <v-text-field
              dense
              label="Serial No."
              outlined
              v-model="formData.serial"
              :rules="formRules.serial"
              @keyup="setUpperCaseTextHandler('serial')"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="4">
            <v-text-field
              counter="10"
              dense
              label="GRN."
              outlined
              v-model="formData.grn"
              :rules="formRules.grn"
              @keyup="setUpperCaseTextHandler('grn')"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="4">
            <v-text-field
              dense
              label="QTY."
              outlined
              type="number"
              v-model="formData.qty"
              :rules="formRules.qty"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="4">
            <v-select
              dense
              label="Store"
              outlined
              v-model="formData.store"
              :items="stores"
            ></v-select>
          </v-col>

          <v-col cols="12" sm="4">
            <v-select
              dense
              label="Used By"
              outlined
              v-model="formData.usedBy"
              :rules="formRules.usedBy"
              :items="staffs"
            ></v-select>
          </v-col>
        </v-row>

        <!-- Spare actions -->
        <v-row>
          <v-col cols="12">
            <span>Spare Actions</span>

            <v-divider class="mb-4"></v-divider>
          </v-col>

          <!-- Issued -->
          <v-col cols="12" :sm="formData.issued.status ? 4 : 12">
            <v-checkbox
              dense
              label="Issued?"
              v-model="formData.issued.status"
              :disabled="formData.returned.status"
              @change="onActionChangeHandler('issued')"
            ></v-checkbox>
          </v-col>

          <v-col cols="12" sm="4" v-if="formData.issued.status">
            <v-text-field
              dense
              label="IS No."
              outlined
              v-model="formData.issued.number"
              :disabled="formData.returned.status"
              :rules="formRules.issuedNumber"
              @keyup="setUpperCaseTextHandler('issued')"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="4" v-if="formData.issued.status">
            <v-select
              dense
              label="By"
              outlined
              v-model="formData.issued.by"
              :disabled="formData.returned.status"
              :items="staffs"
              :rules="formRules.issuedBy"
            ></v-select>
          </v-col>

          <!-- Returned -->
          <v-col
            cols="12"
            :sm="formData.returned.status ? 4 : 12"
            v-if="formData.type === 'Return' && formData.issued.status"
          >
            <v-checkbox
              dense
              label="Returned?"
              v-model="formData.returned.status"
              :disabled="formData.transferred.status"
              @change="onActionChangeHandler('returned')"
            ></v-checkbox>
          </v-col>

          <v-col cols="12" sm="4" v-if="formData.returned.status">
            <v-text-field
              dense
              label="IR No."
              outlined
              v-model="formData.returned.number"
              :disabled="formData.transferred.status"
              :rules="formRules.returnedNumber"
              @keyup="setUpperCaseTextHandler('returned')"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="4" v-if="formData.returned.status">
            <v-select
              dense
              label="By"
              outlined
              v-model="formData.returned.by"
              :disabled="formData.transferred.status"
              :items="staffs"
              :rules="formRules.returnedBy"
            ></v-select>
          </v-col>

          <!-- Transferred -->
          <v-col
            cols="12"
            :sm="formData.transferred.status ? 4 : 12"
            v-if="
              formData.type === 'Return' &&
              formData.issued.status &&
              formData.returned.status
            "
          >
            <v-checkbox
              dense
              label="Transferred?"
              v-model="formData.transferred.status"
              @change="onActionChangeHandler('transferred')"
            ></v-checkbox>
          </v-col>

          <v-col cols="12" sm="4" v-if="formData.transferred.status">
            <v-text-field
              dense
              label="TX No."
              outlined
              v-model="formData.transferred.number"
              :rules="formRules.transferredNumber"
              @keyup="setUpperCaseTextHandler('transferred')"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="4" v-if="formData.transferred.status">
            <v-select
              dense
              label="By"
              outlined
              v-model="formData.transferred.by"
              :items="staffs"
              :rules="formRules.transferredBy"
            ></v-select>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions class="px-4 pt-0 pb-4">
        <v-row class="ma-0">
          <v-col cols="12" sm="2" :class="isMobile ? 'pt-0 pb-2 px-0' : 'pa-0'">
            <v-btn block color="secondary" depressed @click="onFormReset">
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
              block
              color="error"
              depressed
              @click="$refs.confirmDeleteDialog.dialog = true"
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
import { format } from 'date-fns';
import { defaultData } from './constants';
import staffs from '@/staffs.js';
import SharedDialog from '../shared/SharedDialog.vue';

export default {
  name: 'SparesForm',

  components: { SharedDialog },

  data() {
    return {
      airlines: ['ASL', 'CX', 'KA', 'LD', 'PR'],
      staffs: [],
      stores: ['BKK', 'BKK306'],
      types: ['Consumable', 'Fluid', 'Return'],
      formData: { ...defaultData },
      formRules: {},
      modal: false,
    };
  },

  methods: {
    onFormSubmit() {
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

      this.$nextTick(() => {
        if (this.$refs.form.validate()) {
          this.$store.dispatch('setIsLoading');

          this.formData.acreg = this.formData.prefix.concat(this.formData.tail);
          this.formData.status = this.setSpareStatusHandler();

          const spareData = this.formData;

          if (this.$route.params.id) {
            this.$store.dispatch('spares/updateSpare', spareData);
          } else {
            this.$store.dispatch('spares/addSpare', spareData);
          }

          this.$store.dispatch('setIsLoading');

          this.onFormReset();
        }
      });
    },

    onFormReset() {
      this.formRules = {};
      this.formData = { ...defaultData };

      this.$nextTick(() => {
        this.$router.replace('/spares');
      });
    },

    async onDeleteSpare() {
      await this.$store.dispatch('setIsLoading');

      await this.$store.dispatch('spares/deleteSpare', this.$route.params.id);

      await this.$store.dispatch('setIsLoading');
      await this.$router.replace('/spares');
    },

    async fetchSpareByID(id) {
      await this.$store.dispatch('setIsLoading');

      try {
        await this.$store.dispatch('spares/fetchSpareByID', id).then(() => {
          this.formData = this.currentSpare;
        });
      } catch (error) {
        console.log(error.message || 'Something went wrong!');
      }

      await this.$store.dispatch('setIsLoading');
    },

    setDateFormatHandler(date) {
      return format(new Date(date), 'dd MMMM yyyy');
    },

    onAirlineChangeHandler() {
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

    onActionChangeHandler(name) {
      if (!this.formData[name].status) {
        this.formData[name].number = '';
        this.formData[name].by = '';
      }
    },

    onTypeChangeHandler() {
      if (this.formData.type !== 'Return') {
        this.formData.returned = { status: false, number: '', by: '' };
        this.formData.transferred = { status: false, number: '', by: '' };
      }
    },

    setUpperCaseTextHandler(name) {
      if (name === 'issued' || name === 'returned' || name === 'transferred') {
        this.formData[name].number = this.formData[name].number.toUpperCase();
      } else {
        this.formData[name] = this.formData[name].toUpperCase();
      }
    },

    setSpareStatusHandler() {
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

    setStaffsListHandler() {
      const list = [];

      staffs.map(staff => {
        list.push(staff.name);
      });

      this.staffs = list;
    },
  },

  computed: {
    currentSpare() {
      return this.$store.getters['spares/getCurrentSpare'];
    },

    isLoading() {
      return this.$store.getters['getIsLoading'];
    },

    isMobile() {
      return this.$vuetify.breakpoint.xs;
    },
  },

  created() {
    if (this.$route.params.id) {
      this.fetchSpareByID(this.$route.params.id);
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

    this.ssetStaffsListHandler();
  },
};
</script>

<style lang="scss" scoped>
::v-deep .col-12,
.col-sm-2,
.col-sm-3,
.col-sm-4 {
  padding: 4px 12px;
}
</style>
