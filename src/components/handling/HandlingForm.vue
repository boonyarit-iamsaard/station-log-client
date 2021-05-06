<template>
  <v-form ref="form" @submit.prevent="onFormSubmitHandler">
    <SharedDialog
      ref="confirmDeleteDialog"
      :title="'Do you want to proceed?'"
      :subtitle="'This record would be deleted!'"
      @action="onDeleteHandlingRecordHandler"
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
              item-text="text"
              item-value="value"
              label="Airline"
              outlined
              v-model="formData.airline"
              :items="airlines"
              @change="setPrefixHandler"
            ></v-select>
            <v-text-field
              dense
              hint="*"
              label="Other airline"
              outlined
              persistent-hint
              v-if="formData.airline === 'Other'"
              v-model="formData.otherAirline"
              :rules="formRules.required"
              @keyup="
                formData.otherAirline = formData.otherAirline.toUpperCase()
              "
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="3">
            <v-text-field
              dense
              hint="*Required."
              label="Flt No."
              outlined
              persistent-hint
              v-model="formData.fltno"
              :rules="formRules.required"
              @keyup="setUpperCaseTextHandler('fltno')"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="3">
            <v-text-field
              dense
              hint="*Required."
              label="Reg."
              outlined
              persistent-hint
              v-model="formData.tail"
              :prefix="formData.prefix"
              :rules="formRules.required"
              @keyup="setUpperCaseTextHandler('tail')"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <span>Action Details</span>

            <v-divider class="mb-4"></v-divider>
          </v-col>

          <v-col cols="12" sm="2">
            <v-select
              dense
              hint="*Required"
              label="A/C Type"
              outlined
              persistent-hint
              v-model="formData.aircraftType"
              :items="aircraftTypes"
              :rules="formRules.required"
            ></v-select>
          </v-col>

          <v-col cols="12" sm="2">
            <v-autocomplete
              dense
              item-text="text"
              item-value="value"
              label="Check"
              outlined
              v-model="formData.check"
              :items="checks"
              :rules="formRules.required"
              @change="setOtherCheckHandler"
            ></v-autocomplete>
          </v-col>

          <v-col cols="12" sm="2">
            <v-text-field
              dense
              hint="*Required."
              label="Check"
              outlined
              persistent-hint
              v-if="formData.check === 'Other'"
              v-model="formData.otherCheck"
              :rules="formRules.required"
              @keyup="formData.otherCheck = formData.otherCheck.toUpperCase()"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row v-for="(task, index) in formData.tasks" :key="task.id">
          <v-col cols="12" sm="2">
            <v-text-field
              dense
              hint="*optional"
              label="WO/TASK"
              outlined
              persistent-hint
              v-model="task.taskNo"
              @keyup="task.taskNo = task.taskNo.toUpperCase()"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="4">
            <v-textarea
              hint="*Required"
              label="Details"
              outlined
              persistent-hint
              rows="2"
              v-model="task.taskDetails"
              :rules="formRules.required"
              @keyup="task.taskDetails = task.taskDetails.toUpperCase()"
            ></v-textarea>
          </v-col>

          <v-col cols="12" sm="2">
            <v-text-field
              dense
              label="ENG"
              outlined
              type="number"
              v-model="task.hour.eng"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="2">
            <v-text-field
              dense
              label="MECH"
              outlined
              type="number"
              v-model="task.hour.mech"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="2">
            <v-btn
              class="mr-2"
              color="primary"
              depressed
              fab
              small
              v-if="index === formData.tasks.length - 1"
              @click="onAddTaskHandler"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>

            <v-btn
              color="error"
              depressed
              fab
              small
              v-if="index !== 0"
              @click="onDeleteTaskHandler(task.id)"
            >
              <v-icon>mdi-minus</v-icon>
            </v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-divider class="mb-4"></v-divider>
          </v-col>

          <v-col cols="12" sm="4">
            <v-autocomplete
              dense
              label="EIC"
              outlined
              v-model="formData.eic"
              :items="engineers"
              :rules="formRules.required"
            ></v-autocomplete>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions class="px-4 pt-0 pb-4">
        <v-row class="ma-0">
          <v-col cols="12" sm="2" :class="isMobile ? 'pt-0 pb-2 px-0' : 'pa-0'">
            <v-btn
              block
              color="secondary"
              depressed
              @click="onFormResetHandler"
            >
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
import staffs from '@/staffs.js';
import { defaultData } from '@/components/handling/constants';

import SharedDialog from '@/components/shared/SharedDialog.vue';

export default {
  name: 'HandlingForm',

  components: { SharedDialog },

  data() {
    return {
      aircraftTypes: [
        'A320',
        'A321',
        'A306',
        'A330',
        'A33F',
        'A350',
        'B777',
        'Other',
      ],
      airlines: [
        { text: 'ASL', value: 'ASL' },
        { text: 'CX', value: 'CX' },
        { text: 'KA', value: 'KA' },
        { text: 'LD', value: 'LD' },
        { text: 'PR', value: 'PR' },
        { text: 'Other', value: 'Other' },
      ],
      checks: [
        { text: 'ETR', value: 'ETR' },
        { text: 'OCT', value: 'OCT' },
        { text: 'TR', value: 'TR' },
        { text: '36H', value: '36H' },
        { text: '72H', value: '72H' },
        { text: 'WY', value: 'WY' },
        { text: '10DY', value: '10DY' },
        { text: 'Other', value: 'Other' },
      ],
      engineers: [],
      formData: { ...defaultData, tasks: [...defaultData.tasks] },
      formRules: {},
      modal: false,
      otherAirline: '',
      otherCheck: '',
    };
  },

  methods: {
    async fetchCurrentHandlingRecordHandler(id) {
      await this.$store.dispatch('setIsLoading');

      try {
        await this.$store
          .dispatch('handling/fetchCurrentHandlingRecord', id)
          .then(() => {
            this.formData = this.currentHandlingRecord;
          });
      } catch (error) {
        console.log(error.message || 'Something went wrong!');
      }

      await this.$store.dispatch('setIsLoading');
    },

    onFormSubmitHandler() {
      this.formRules = {
        required: [v => !!v || '*Required.'],
      };

      this.$nextTick(() => {
        if (this.$refs.form.validate()) {
          this.$store.dispatch('setIsLoading');

          this.formData.acreg = this.formData.prefix.concat(this.formData.tail);

          const handlingData = this.formData;

          if (this.$route.params.id) {
            this.$store.dispatch('handling/updateHandlingRecord', handlingData);
          } else {
            this.$store.dispatch('handling/addHandlingRecord', handlingData);
          }

          this.$store.dispatch('setIsLoading');

          this.onFormResetHandler();
        }
      });
    },

    onFormResetHandler() {
      this.formRules = {};
      this.formData = { ...defaultData, tasks: [...defaultData.tasks] };

      this.$nextTick(() => {
        this.$router.replace('/handling');
      });
    },

    async onDeleteHandlingRecordHandler() {
      await this.$store.dispatch('setIsLoading');

      await this.$store.dispatch(
        'handling/deleteHandlingRecord',
        this.$route.params.id
      );

      this.$store.dispatch('setIsLoading');

      await this.$router.replace('/handling');
    },

    setPrefixHandler() {
      switch (this.formData.airline) {
        case 'ASL':
          this.formData.prefix = 'EI-';
          this.formData.otherAirline = '';
          break;
        case 'PR':
          this.formData.prefix = 'RP-C';
          this.formData.otherAirline = '';
          break;
        case 'CX':
        case 'KA':
        case 'LD':
          this.formData.prefix = 'B-';
          this.formData.otherAirline = '';
          break;
        default:
          this.formData.prefix = '';
      }
    },

    setOtherCheckHandler() {
      this.formData.check !== 'Other'
        ? (this.formData.otherCheck = '')
        : (this.formData.otherCheck = '');
    },

    onAddTaskHandler() {
      this.formData.tasks.push({
        // id: uuidv4(),
        taskNo: '',
        taskDetails: '',
        hour: {
          eng: 0,
          mech: 0,
        },
      });
    },

    onDeleteTaskHandler(id) {
      this.formData.tasks = this.formData.tasks.filter(task => task._id !== id);
    },

    setDateFormatHandler(date) {
      return format(new Date(date), 'dd MMMM yyyy');
    },

    setEngineerListHandler() {
      const list = [];

      staffs.map(staff => {
        if (staff.position === 'Engineer') {
          list.push(staff.name);
        }
      });

      this.engineers = list;
    },

    setUpperCaseTextHandler(name) {
      this.formData[name] = this.formData[name].toUpperCase();
    },
  },

  computed: {
    currentHandlingRecord() {
      return this.$store.getters['handling/getCurrentHandlingRecord'];
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
      this.fetchCurrentHandlingRecordHandler(this.$route.params.id);
    }

    this.setEngineerListHandler();
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
