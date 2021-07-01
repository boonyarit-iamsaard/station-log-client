<template>
  <v-container class="pa-0" style="max-width: 959px">
    <v-form ref="form" @submit.prevent="submitForm">
      <div class="mb-4">
        <span class="title">Flight Movement Form</span>
      </div>

      <v-card class="shadow">
        <v-card-text class="pb-0">
          <!--Flight Details-->
          <v-row>
            <v-col cols="12">
              <p class="black--text subtitle-1 mb-2">Flight Details</p>
            </v-col>

            <v-col cols="12" sm="4">
              <input-date v-model="flight.date" />
            </v-col>

            <v-col cols="12" sm="2">
              <input-combo
                :items="airlines"
                @change="onAirlineChange"
                label="Airline"
                upper-case
                v-model="flight.airline"
              />
            </v-col>

            <v-col cols="12" sm="3">
              <input-text
                :rules="flightRules.fltno"
                label="Flt No"
                v-model="flight.fltno"
                upper-case
              />
            </v-col>

            <v-col cols="12" sm="3">
              <input-text
                :prefix="flight.prefix"
                :rules="flightRules.tail"
                label="Reg."
                v-model="flight.tail"
                upper-case
              />
            </v-col>

            <v-col cols="12" sm="2">
              <input-text
                :rules="flightRules.ata"
                hint="HH:mm"
                label="ATA"
                time
                v-model="flight.ata"
              />
            </v-col>

            <v-col cols="12" sm="2">
              <input-text
                :rules="flightRules.atd"
                hint="HH:mm"
                label="ATD"
                time
                v-model="flight.atd"
              />
            </v-col>

            <v-col cols="12" sm="2">
              <input-text
                :rules="flightRules.bay"
                label="Bay"
                v-model="flight.bay"
                upper-case
              />
            </v-col>

            <v-col cols="12" sm="3">
              <input-combo
                :items="checks"
                label="Check-1"
                v-model="flight.check1"
                upper-case
              />
            </v-col>

            <v-col cols="12" sm="3">
              <input-combo
                :items="checks"
                hint="if applicable"
                label="Check-2"
                v-model="flight.check2"
                upper-case
              />
            </v-col>
          </v-row>

          <v-divider class="my-4" />

          <!--Flight Services-->
          <v-row>
            <v-col cols="12">
              <p class="black--text mb-2 subtitle-1">Flight Services</p>
            </v-col>

            <v-col cols="12" sm="3">
              <input-text label="400 Hz." number v-model="flight.afac" />
            </v-col>

            <v-col cols="12" sm="3">
              <input-checkbox label="Water" v-model="flight.water" />
            </v-col>

            <v-col cols="12" sm="3">
              <input-checkbox label="Lavatory" v-model="flight.lavatory" />
            </v-col>
          </v-row>

          <v-divider class="mb-4" />

          <!--Extra Ground Equipments-->
          <v-row class="my-0">
            <v-col
              class="pt-0"
              cols="12"
              v-if="flight.extraGroundEquipments.length > 0"
            >
              <span class="black--text subtitle-1">
                Extra Ground Equipments
              </span>
            </v-col>

            <v-col cols="12" v-if="flight.extraGroundEquipments.length === 0">
              <v-btn
                @click="addExtraGroundEquipment"
                class="mb-4"
                color="info"
                outlined
              >
                Add Extra Ground Equipments
              </v-btn>
            </v-col>
          </v-row>

          <flight-form-extra-ground-equipment
            :rules="flightRules.extraGroundEquipment"
            @addExtraGroundEquipment="addExtraGroundEquipment"
            @deleteExtraGroundEquipment="deleteExtraGroundEquipment"
            v-model="flight.extraGroundEquipments"
          />

          <v-divider class="mb-4" />

          <!--Tasks completed-->
          <v-row class="my-0">
            <v-col class="pt-0" cols="12" v-if="flight.tasks.length > 0">
              <span class="black--text subtitle-1">Tasks Completed</span>
            </v-col>

            <v-col cols="12" v-if="flight.tasks.length === 0">
              <v-btn @click="addTask" class="mb-4" color="info" outlined>
                Add Tasks Completed
              </v-btn>
            </v-col>
          </v-row>

          <flight-form-task-complete
            :rules="flightRules.task"
            @addTask="addTask"
            @deleteTask="deleteTask"
            v-model="flight.tasks"
          />

          <v-divider class="mb-4" />

          <!--Chargeable services-->
          <v-row class="my-0">
            <v-col
              class="pt-0"
              cols="12"
              v-if="flight.chargeableServices.length > 0"
            >
              <span class="black--text subtitle-1">
                Chargeable Services / Equipments
              </span>
            </v-col>

            <v-col cols="12" v-if="flight.chargeableServices.length === 0">
              <v-btn class="mb-4" color="info" outlined>
                Add Chargeable Services / Equipments
              </v-btn>
            </v-col>
          </v-row>

          <v-divider class="mb-4" />

          <!--Assigned delay codes-->
          <v-row class="my-0">
            <v-col class="pt" cols="12" v-if="flight.assignedDelay.length > 0">
              <span class="black--text subtitle-1">Assigned Delay Codes</span>
            </v-col>

            <v-col cols="12" v-if="flight.assignedDelay.length === 0">
              <v-btn class="mb-4" color="info" outlined>
                Add Assigned Delay Codes
              </v-btn>
            </v-col>
          </v-row>

          <v-divider class="mb-4" />

          <!--Handling by-->
          <v-row class="my-0">
            <v-col class="pt-0" cols="12">
              <span class="black--text subtitle-1">Handling By</span>
            </v-col>

            <v-col cols="12" sm="3">
              <input-select
                :items="engineers"
                label="Engineer"
                v-model="flight.engineer"
              />
            </v-col>

            <v-col cols="12" sm="3">
              <input-text
                label="Mechanic-1"
                v-model="flight.mechanic1"
                upper-case
              />
            </v-col>

            <v-col cols="12" sm="3">
              <input-text
                hint="if applicable"
                label="Mechanic-2"
                v-model="flight.mechanic2"
                upper-case
              />
            </v-col>

            <v-col cols="12" sm="3">
              <input-select
                :items="staffs"
                label="Record By"
                v-model="flight.recordBy"
              />
            </v-col>

            <v-col cols="12">
              <input-textarea
                label="Remark / Handover"
                v-model="flight.remark"
              />
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="px-4 pt-0 pb-4">
          <div>
            <v-btn class="shadow" color="error">Delete</v-btn>
          </div>

          <v-spacer />

          <div>
            <v-btn class="shadow mr-4" color="secondary">Cancel</v-btn>

            <v-btn class="shadow" color="primary" type="submit">Save</v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-container>
</template>

<script>
import FlightFormExtraGroundEquipment from '@/components/flights/FlightFormExtraGroundEquipment';
import FlightFormTaskComplete from '@/components/flights/FlightFormTaskComplete';
import InputCheckbox from '@/components/shared/input/InputCheckbox';
import InputCombo from '@/components/shared/input/InputCombo';
import InputDate from '@/components/shared/input/InputDate';
import InputSelect from '@/components/shared/input/InputSelect';
import InputText from '@/components/shared/input/InputText';
import InputTextarea from '@/components/shared/input/InputTextarea';

import { IDGenerator } from '@/utils/id-generator';
import { engineers, staffs } from '@/utils/staffs';

export default {
  name: 'FlightFormNew',

  components: {
    'flight-form-extra-ground-equipment': FlightFormExtraGroundEquipment,
    'flight-form-task-complete': FlightFormTaskComplete,
    'input-checkbox': InputCheckbox,
    'input-combo': InputCombo,
    'input-date': InputDate,
    'input-select': InputSelect,
    'input-text': InputText,
    'input-textarea': InputTextarea,
  },

  data() {
    return {
      airlines: ['ASL', 'CX', 'KA', 'LD', 'PR'],
      checks: ['10D', '36H', '72H', 'ETR', 'OCT', 'TR', 'WY'],
      engineers: engineers(),
      extraGroundEquipment: {
        company: '',
        equipment: '',
      },
      flight: {
        date: new Date().toISOString().substr(0, 10),
        airline: 'CX',
        fltno: '',
        prefix: 'B-',
        tail: '',
        acreg: '',
        ata: '',
        atd: '',
        bay: '',
        check1: '',
        check2: '',
        afac: 0,
        water: false,
        lavatory: false,
        extraGroundEquipments: [],
        tasks: [],
        chargeableServices: [],
        assignedDelay: [],
        remark: '',
        engineer: '',
        mechanic1: '',
        mechanic2: '',
        recordBy: '',
      },
      flightRules: {},
      staffs: staffs(),
      task: {
        taskNo: '',
        taskDetails: '',
        deferral: '',
        deferralNumber: '',
        deferralAction: '',
        engineerHours: 0,
        mechanicHours: 0,
      },
    };
  },

  methods: {
    addExtraGroundEquipment() {
      this.flight.extraGroundEquipments.push({
        _id: IDGenerator(),
        ...this.extraGroundEquipment,
      });
    },

    addTask() {
      this.flight.tasks.push({
        _id: IDGenerator(),
        ...this.task,
      });
    },

    deleteExtraGroundEquipment(id) {
      this.flight.extraGroundEquipments = this.flight.extraGroundEquipments.filter(
        equipment => equipment._id !== id
      );
    },

    deleteTask(id) {
      this.flight.tasks = this.flight.tasks.filter(task => task._id !== id);
    },

    onAirlineChange() {
      switch (this.flight.airline) {
        case 'ASL':
          this.flight.prefix = 'EI-';
          break;
        case 'PR':
          this.flight.prefix = 'RP-C';
          break;
        case 'CX':
        case 'KA':
        case 'LD':
          this.flight.prefix = 'B-';
          break;
        default:
          this.flight.prefix = '';
      }
    },

    submitForm() {
      this.flightRules = {
        fltno: [v => !!v || 'Flt No. is required.'],
        // tail: [v => !!v || 'A/C Reg. is required.'],
        task: {
          taskDetails: [v => !!v || 'Task details is required.'],
        },
        extraGroundEquipment: {
          company: [v => !!v || 'Company is required.'],
          equipment: [v => !!v || 'Equipment is required.'],
        },
      };

      this.$nextTick(() => {
        if (this.$refs.form.validate()) {
          this.flight.acreg = this.flight.prefix.concat(this.flight.tail);

          console.log(JSON.stringify(this.flight, null, 2));
        }
      });
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
  padding: 8px;
}
</style>
