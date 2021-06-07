<!--suppress ALL -->
<template>
  <v-form ref="form" @submit.prevent="validateFlightDetails">
    <v-row class="my-0">
      <v-col cols="12">
        <DatePicker
          :provided-date="flightDetails.date"
          @getSelectedDate="getSelectedDate"
        />
      </v-col>

      <v-col cols="12" :sm="isOtherAirline ? 6 : 4">
        <v-select
          :items="airlines"
          @change="setPrefixHandler"
          dense
          label="Airline"
          outlined
          v-model="flightDetails.airline"
        ></v-select>
      </v-col>

      <v-col cols="12" sm="6" v-if="isOtherAirline">
        <v-text-field
          :rules="flightDetailsRules.required"
          @keyup="setUpperCaseTextHandler('otherAirline')"
          dense
          label="Other airline"
          outlined
          v-model="flightDetails.otherAirline"
        ></v-text-field>
      </v-col>

      <v-col cols="12" :sm="isOtherAirline ? 6 : 4">
        <v-text-field
          dense
          label="Flt No."
          outlined
          v-model="flightDetails.fltno"
          :rules="flightDetailsRules.required"
          @keyup="setUpperCaseTextHandler('fltno')"
        ></v-text-field>
      </v-col>

      <v-col cols="12" :sm="isOtherAirline ? 6 : 4">
        <v-text-field
          dense
          label="Reg."
          outlined
          v-model="flightDetails.tail"
          :prefix="flightDetails.prefix"
          :rules="flightDetailsRules.required"
          @keyup="setUpperCaseTextHandler('tail')"
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="4">
        <v-text-field
          dense
          hint="HH:mm"
          label="ATA"
          outlined
          persistent-hint
          v-mask="'##:##'"
          v-model="flightDetails.ata"
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="4">
        <v-text-field
          dense
          hint="HH:mm"
          label="ATD"
          outlined
          persistent-hint
          v-mask="'##:##'"
          v-model="flightDetails.atd"
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="4">
        <v-text-field
          dense
          label="Bay"
          outlined
          v-model="flightDetails.bay"
          :rules="flightDetailsRules.required"
          @keyup="setUpperCaseTextHandler('bay')"
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="4">
        <v-select
          :items="checks"
          :menu-props="menuPropsMaxHeight"
          :rules="flightDetailsRules.required"
          @change="setOtherCheckHandler"
          dense
          label="Check"
          outlined
          v-model="flightDetails.check"
        ></v-select>
      </v-col>

      <v-col cols="12" sm="4" v-if="isOtherCheck">
        <v-text-field
          dense
          label="Other Check"
          outlined
          v-model="flightDetails.otherCheck"
          :rules="flightDetailsRules.required"
          @keyup="setUpperCaseTextHandler('otherCheck')"
        ></v-text-field>
      </v-col>

      <v-col cols="12" :sm="isOtherCheck ? 6 : 4">
        <v-select
          :items="aircraftTypes"
          :menu-props="menuPropsMaxHeight"
          :rules="flightDetailsRules.required"
          dense
          label="A/C Type"
          outlined
          v-model="flightDetails.aircraftType"
        ></v-select>
      </v-col>

      <v-col cols="12">
        <v-select
          :items="engineers"
          :menu-props="menuPropsMaxHeight"
          :rules="flightDetailsRules.required"
          dense
          label="EIC"
          outlined
          v-model="flightDetails.eic"
        ></v-select>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { VueMaskDirective } from 'v-mask';
import {
  aircraftTypes,
  airlines,
  checks,
  getEngineersList,
} from '@/services/form-service';
import DatePicker from '@/components/shared/DatePicker';

export default {
  name: 'FlightsFormFlightDetails',

  components: { DatePicker },

  directives: {
    mask: VueMaskDirective,
  },

  data() {
    return {
      aircraftTypes,
      airlines,
      checks,
      engineers: getEngineersList(),
      flightDetails: {
        date: new Date().toISOString().substr(0, 10),
        airline: 'CX',
        otherAirline: '',
        fltno: '',
        prefix: 'B-',
        tail: '',
        acreg: '',
        aircraftTypes: '',
        check: '',
        otherCheck: '',
        ata: '',
        atd: '',
        bay: '',
        eic: '',
      },
      flightDetailsRules: {},
      menuPropsMaxHeight: { maxHeight: '100%' },
    };
  },

  methods: {
    getSelectedDate(date) {
      this.flightDetails.date = date;
      console.log(this.flightDetails.date);
    },

    setOtherCheckHandler() {
      this.flightDetails.otherCheck = '';
    },

    setPrefixHandler() {
      switch (this.flightDetails.airline) {
        case 'ASL':
          this.flightDetails.prefix = 'EI-';
          this.flightDetails.otherAirline = '';
          break;
        case 'PR':
          this.flightDetails.prefix = 'RP-C';
          this.flightDetails.otherAirline = '';
          break;
        case 'CX':
        case 'KA':
        case 'LD':
          this.flightDetails.prefix = 'B-';
          this.flightDetails.otherAirline = '';
          break;
        default:
          this.flightDetails.prefix = '';
      }
    },

    setUpperCaseTextHandler(name) {
      this.flightDetails[name] = this.flightDetails[name].toUpperCase();
    },

    validateFlightDetails() {
      this.flightDetailsRules = {
        required: [v => !!v || 'Required.'],
      };
    },
  },

  computed: {
    isOtherAirline() {
      return this.flightDetails.airline === 'Other';
    },

    isOtherCheck() {
      return this.flightDetails.check === 'Other';
    },
  },
};
</script>

<style scoped>
::v-deep .row {
  margin: -8px;
}
::v-deep .col-12,
.col-sm-2,
.col-sm-3,
.col-sm-4 {
  padding: 8px 8px;
}
</style>
