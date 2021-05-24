<template>
  <v-form ref="form" @submit.prevent="submitFormHandler">
    <ConfirmDialog
      ref="confirmDialog"
      :title="confirmDialogTitle"
      :subtitle="confirmDialogSubtitle"
      @action="confirmDialogAction"
    />

    <Progress :isLoading="isLoading" />

    <v-card class="mx-auto" max-width="959" outlined>
      <v-card-text>
        <v-row class="my-0">
          <v-col cols="12">
            <span class="subtitle-2">Flight Details</span>
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
              :items="airlines"
              @change="setPrefixHandler"
              dense
              label="Airline"
              outlined
              v-model="formData.airline"
            ></v-select>
          </v-col>

          <v-col cols="12" sm="2" v-if="formData.airline === 'Other'">
            <v-text-field
              dense
              label="Other airline"
              outlined
              v-model="formData.otherAirline"
              :rules="formRules.required"
              @keyup="
                formData.otherAirline = formData.otherAirline.toUpperCase()
              "
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="2">
            <v-text-field
              dense
              label="Flt No."
              outlined
              v-model="formData.fltno"
              :rules="formRules.required"
              @keyup="setUpperCaseTextHandler('fltno')"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="2">
            <v-text-field
              dense
              label="Reg."
              outlined
              v-model="formData.tail"
              :prefix="formData.prefix"
              :rules="formRules.required"
              @keyup="setUpperCaseTextHandler('tail')"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="2">
            <v-select
              :items="aircraftTypes"
              :menu-props="menuPropsMaxHeight"
              :rules="formRules.required"
              dense
              label="A/C Type"
              outlined
              v-model="formData.aircraftType"
            ></v-select>
          </v-col>

          <v-col cols="12" sm="2">
            <v-autocomplete
              :items="checks"
              :menu-props="menuPropsMaxHeight"
              :rules="formRules.required"
              @change="setOtherCheckHandler"
              dense
              label="Check"
              outlined
              v-model="formData.check"
            ></v-autocomplete>
          </v-col>

          <v-col cols="12" sm="2" v-if="formData.check === 'Other'">
            <v-text-field
              dense
              label="Check"
              outlined
              v-model="formData.otherCheck"
              :rules="formRules.required"
              @keyup="formData.otherCheck = formData.otherCheck.toUpperCase()"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="4">
            <v-autocomplete
              dense
              label="EIC"
              outlined
              v-model="formData.eic"
              :items="engineers"
              :menu-props="menuPropsMaxHeight"
              :rules="formRules.required"
            ></v-autocomplete>
          </v-col>
        </v-row>

        <v-row class="my-0">
          <v-col cols="12">
            <v-icon
              @click="addTaskHandler"
              class="mr-2"
              color="primary"
              v-if="formData.tasks.length === 0"
              large
              >mdi-plus-circle-outline</v-icon
            >
            <span class="subtitle-2">WO/TASK</span>
          </v-col>
        </v-row>

        <v-row
          :key="task._id"
          class="my-0"
          v-for="(task, index) in formData.tasks"
        >
          <v-col cols="12" sm="6">
            <v-text-field
              @keyup="task.taskNo = task.taskNo.toUpperCase()"
              dense
              label="WO/TASK"
              outlined
              v-model="task.taskNo"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="2">
            <v-text-field
              dense
              label="eng (hr.)"
              outlined
              type="number"
              v-model="task.hour.eng"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="2">
            <v-text-field
              dense
              label="mech (hr.)"
              outlined
              type="number"
              v-model="task.hour.mech"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="2" v-if="$vuetify.breakpoint.smAndUp">
            <v-icon
              @click="addTaskHandler"
              class="mr-2"
              color="primary"
              v-if="index === formData.tasks.length - 1"
              large
            >
              mdi-plus-circle-outline
            </v-icon>

            <v-icon
              @click="clickDeleteTaskHandler(task._id)"
              color="error"
              large
            >
              mdi-minus-circle-outline
            </v-icon>
          </v-col>

          <v-col cols="12" sm="10">
            <v-textarea
              :rules="formRules.required"
              @keyup="task.taskDetails = task.taskDetails.toUpperCase()"
              label="Details"
              outlined
              rows="2"
              v-model="task.taskDetails"
            />
          </v-col>

          <v-col cols="12" sm="2" v-if="$vuetify.breakpoint.xs">
            <v-icon
              @click="addTaskHandler"
              class="mr-2"
              color="primary"
              large
              v-if="index === formData.tasks.length - 1"
            >
              mdi-plus-circle-outline
            </v-icon>

            <v-icon
              @click="clickDeleteTaskHandler(task._id)"
              color="error"
              large
            >
              mdi-minus-circle-outline
            </v-icon>
          </v-col>
        </v-row>

        <v-row class="my-0">
          <v-col cols="12">
            <v-icon
              @click="addServiceHandler"
              class="mr-2"
              color="primary"
              large
              v-if="formData.services.length === 0"
            >
              mdi-plus-circle-outline
            </v-icon>
            <span class="subtitle-2">Equipment & Tooling</span>
          </v-col>
        </v-row>

        <v-row
          class="my-0"
          v-for="(service, index) in formData.services"
          :key="service._id"
        >
          <v-col cols="12" sm="4">
            <v-select
              :items="serviceNames"
              :menu-props="menuPropsMaxHeight"
              :rules="formRules.service"
              dense
              label="Service"
              outlined
              v-model="service.service"
            />
          </v-col>

          <v-col
            cols="12"
            sm="2"
            v-if="exclusivePerHour().includes(service.service)"
          >
            <v-text-field
              dense
              label="usage (hr.)"
              outlined
              type="number"
              v-model="service.usage"
            />
          </v-col>

          <v-col
            cols="12"
            sm="2"
            v-if="exclusivePerService().includes(service.service)"
          >
            <v-text-field
              dense
              label="eng (hr.)"
              outlined
              type="number"
              v-model="service.hour.eng"
            />
          </v-col>

          <v-col
            cols="12"
            sm="2"
            v-if="exclusivePerService().includes(service.service)"
          >
            <v-text-field
              dense
              label="mech  (hr.)"
              outlined
              type="number"
              v-model="service.hour.mech"
            />
          </v-col>

          <v-col cols="12" sm="2" v-if="!isMobile">
            <v-icon
              @click="addServiceHandler"
              class="mr-2"
              color="primary"
              v-if="index === formData.services.length - 1"
              large
            >
              mdi-plus-circle-outline
            </v-icon>

            <v-icon
              @click="clickDeleteServiceHandler(service._id)"
              color="error"
              large
            >
              mdi-minus-circle-outline
            </v-icon>
          </v-col>
        </v-row>

        <v-row class="my-0">
          <v-col cols="12" sm="4">
            <v-icon
              @click="hasBrakeCooling = true"
              class="mr-2"
              color="primary"
              large
              v-if="!hasBrakeCooling"
            >
              mdi-plus-circle-outline
            </v-icon>

            <v-icon
              @click="clickDeleteBrakeCoolingHandler"
              class="mr-2"
              color="error"
              large
              v-if="hasBrakeCooling"
            >
              mdi-minus-circle-outline
            </v-icon>

            <span class="subtitle-2">Brake Cooling</span>
          </v-col>

          <v-col cols="12" sm="2" v-if="hasBrakeCooling">
            <v-text-field
              dense
              outlined
              label="Amount"
              type="number"
              v-model="formData.brakeCooling.fan"
            />
          </v-col>

          <v-col cols="12" sm="2" v-if="hasBrakeCooling">
            <v-text-field
              dense
              label="eng (hour)"
              outlined
              type="number"
              v-model="formData.brakeCooling.hour.eng"
            />
          </v-col>

          <v-col cols="12" sm="2" v-if="hasBrakeCooling">
            <v-text-field
              dense
              label="mech (hour)"
              outlined
              type="number"
              v-model="formData.brakeCooling.hour.mech"
            />
          </v-col>
        </v-row>

        <v-row class="my-0">
          <v-col cols="12" sm="10">
            <v-textarea
              @keyup="setUpperCaseTextHandler('remark')"
              label="Remark"
              outlined
              v-model="formData.remark"
            />
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions class="px-4 pt-0 pb-4">
        <v-row class="ma-0">
          <v-col cols="12" sm="2" :class="isMobile ? 'pt-0 pb-2 px-0' : 'pa-0'">
            <v-btn block color="secondary" depressed @click="resetFormHandler">
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
              :disabled="!isAdmin"
              @click="clickDeleteRecordHandler"
              block
              color="error"
              depressed
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
import { cloneDeep } from 'lodash';
import { generateObjectID } from '@/utils/object-id';
import { engineersList } from '@/utils/staffs';
import {
  aircraftTypes,
  airlines,
  checks,
  exclusivePerHour,
  exclusivePerService,
  handlingData,
  service,
  serviceNames,
  task,
} from '@/components/handling/constants';

import ConfirmDialog from '@/components/shared/ConfirmDialog.vue';
import Progress from '../shared/Progress.vue';

export default {
  name: 'HandlingForm',

  components: { ConfirmDialog, Progress },

  data() {
    return {
      aircraftTypes,
      airlines,
      checks,
      confirmDialogAction: () => {},
      confirmDialogSubtitle: '',
      confirmDialogTitle: '',
      deleteTaskDialog: false,
      engineers: engineersList(),
      exclusivePerHour,
      exclusivePerService,
      formData: cloneDeep(handlingData),
      formRules: {},
      hasBrakeCooling: false,
      isLoading: false,
      menuPropsMaxHeight: { maxHeight: 500 },
      modal: false,
      otherAirline: '',
      otherCheck: '',
      serviceID: '',
      serviceNames: serviceNames(),
      taskID: '',
    };
  },

  methods: {
    async fetchCurrentHandlingRecordHandler(id) {
      this.isLoading = true;

      try {
        await this.$store
          .dispatch('handling/fetchCurrentHandlingRecord', id)
          .then(() => {
            this.formData = cloneDeep(this.currentHandlingRecord);

            if (this.formData.brakeCooling.fan > 0) {
              this.hasBrakeCooling = true;
            }
          });
      } catch (error) {
        console.log(error.message || 'Something went wrong!');
      }

      this.isLoading = false;
    },

    submitFormHandler() {
      this.formRules = {
        required: [v => !!v || 'Required.'],
        service: [v => v !== 'Please select' || 'Please select.'],
      };

      this.$nextTick(() => {
        if (this.$refs.form.validate()) {
          this.isLoading = true;

          this.formData.acreg = this.formData.prefix.concat(this.formData.tail);

          const handlingData = this.formData;

          console.log(JSON.stringify(handlingData, null, 2));

          if (this.$route.params.id) {
            this.$store.dispatch('handling/updateHandlingRecord', handlingData);
          } else {
            this.$store.dispatch('handling/addHandlingRecord', handlingData);
          }

          this.isLoading = false;

          this.resetFormHandler();
        }
      });
    },

    resetFormHandler() {
      this.formRules = {};
      this.formData = cloneDeep(handlingData);

      this.$nextTick(() => {
        this.$router.replace('/handling');
      });
    },

    clickDeleteBrakeCoolingHandler() {
      this.hasBrakeCooling = false;
      this.formData.brakeCooling.fan = 0;
      this.formData.brakeCooling.hour = {
        eng: 0,
        mech: 0,
      };
    },

    clickDeleteTaskHandler(id) {
      this.$refs.confirmDialog.dialog = true;
      this.confirmDialogAction = this.deleteTaskHandler;
      this.confirmDialogSubtitle = 'This WO/TASK will be deleted.';
      this.confirmDialogTitle = 'Delete WO/TASK?';
      this.taskID = id;
    },

    clickDeleteServiceHandler(id) {
      this.$refs.confirmDialog.dialog = true;
      this.confirmDialogAction = this.deleteServiceHandler;
      this.confirmDialogSubtitle = 'This service will be deleted.';
      this.confirmDialogTitle = 'Delete Service?';
      this.serviceID = id;
    },

    clickDeleteRecordHandler() {
      this.$refs.confirmDialog.dialog = true;
      this.confirmDialogAction = this.deleteRecordHandler;
      this.confirmDialogTitle = 'Delete Record?';
      this.confirmDialogSubtitle = 'This record will be deleted.';
    },

    addTaskHandler() {
      this.formData.tasks.push({
        ...task,
        _id: generateObjectID(),
        hour: { ...task.hour },
      });
    },

    addServiceHandler() {
      this.formData.services.push({
        ...service,
        _id: generateObjectID(),
        hour: { ...service.hour },
      });
    },

    deleteTaskHandler() {
      this.formData.tasks = this.formData.tasks.filter(
        task => task._id !== this.taskID
      );
    },

    deleteServiceHandler() {
      this.formData.services = this.formData.services.filter(
        service => service._id !== this.serviceID
      );
    },

    async deleteRecordHandler() {
      this.isLoading = true;

      await this.$store.dispatch(
        'handling/deleteHandlingRecord',
        this.$route.params.id
      );

      this.isLoading = false;

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
      this.formData.otherCheck = '';
    },

    setDateFormatHandler(date) {
      return format(new Date(date), 'dd MMMM yyyy');
    },

    setUpperCaseTextHandler(name) {
      this.formData[name] = this.formData[name].toUpperCase();
    },
  },

  computed: {
    currentHandlingRecord() {
      return this.$store.getters['handling/getCurrentHandlingRecord'];
    },

    isAdmin() {
      return this.$store.getters['getIsAdmin'];
    },

    isMobile() {
      return this.$vuetify.breakpoint.xs;
    },
  },

  created() {
    if (this.$route.params.id) {
      this.fetchCurrentHandlingRecordHandler(this.$route.params.id);
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
  padding: 8px;
}
</style>
