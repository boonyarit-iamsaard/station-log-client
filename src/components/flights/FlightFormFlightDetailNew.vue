<template>
  <v-card outlined class="mb-4" min-height="200px">
    <v-row class="ma-0" :key="key" v-for="(value, key) in fields">
      <v-col class="pt-4 pb-0 px-4" cols="12" v-if="value.type === 'date'">
        <FieldDate :fields="value" :ref="key" v-model="flightDetails[key]" />
      </v-col>

      <v-col
        class="pt-4 pb-0 px-4"
        v-if="value.type === 'text' && value.display"
      >
        <FieldText :fields="value" :ref="key" v-model="flightDetails[key]" />
      </v-col>

      <v-col :sm="value.sm" class="pt-4 pb-0 px-4" v-if="value.type === 'time'">
        <FieldTime :fields="value" :ref="key" v-model="flightDetails[key]" />
      </v-col>

      <v-col
        class="pt-4 pb-0 px-4"
        cols="12"
        v-if="value.type === 'select' && key !== 'airline' && key !== 'check'"
      >
        <FieldSelect :ref="key" :fields="value" v-model="flightDetails[key]" />
      </v-col>

      <v-col
        class="pt-4 pb-0 px-4"
        cols="12"
        v-if="value.type === 'select' && key === 'airline'"
      >
        <FieldSelect :ref="key" :fields="value" v-model="airline" />
      </v-col>

      <v-col
        class="pt-4 pb-0 px-4"
        cols="12"
        v-if="value.type === 'select' && key === 'check'"
      >
        <FieldSelect :ref="key" :fields="value" v-model="check" />
      </v-col>
    </v-row>

    <v-row class="ma-0">
      <v-col class="pa-4" cols="12">
        <v-btn block class="pa-0" text @click="validateFlightDetails">
          Validate
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import FieldDate from '../shared/fields/FieldDate.vue';
import FieldSelect from '../shared/fields/FieldSelect.vue';
import FieldText from '../shared/fields/FieldText.vue';
import FieldTime from '../shared/fields/FieldTime.vue';

export default {
  name: 'FlightFormFlightDetailNew',

  components: {
    FieldDate,
    FieldSelect,
    FieldText,
    FieldTime,
  },

  data() {
    return {
      flightDetails: {
        date: new Date().toISOString().substr(0, 10),
        airline: 'CX',
        otherAirline: '',
        fltno: '',
        prefix: 'B-',
        tail: '',
        acreg: 'B-',
        ata: '',
        atd: '',
        bay: '',
        check: '',
        otherCheck: '',
      },
      fields: {
        date: {
          display: true,
          label: 'Date',
          rules: [],
          type: 'date',
        },
        airline: {
          display: true,
          items: ['ASL', 'CX', 'KA', 'LD', 'PR', 'Other'],
          label: 'Airline',
          rules: [],
          type: 'select',
        },
        otherAirline: {
          display: false,
          label: 'Other airline',
          rules: [],
          type: 'text',
        },
        fltno: {
          display: true,
          label: 'Flt No.',
          rules: [],
          type: 'text',
        },
        tail: {
          display: true,
          label: 'Reg.',
          rules: [],
          type: 'text',
        },
        ata: {
          display: true,
          label: 'ATA',
          rules: [],
          type: 'time',
        },
        atd: {
          display: true,
          label: 'ATD',
          rules: [],
          type: 'time',
        },
        bay: {
          display: true,
          label: 'Bay',
          rules: [],
          type: 'text',
        },
        check: {
          display: true,
          items: ['10D', '36H', '72H', 'ETR', 'DY', 'OCT', 'TR', 'WY', 'Other'],
          label: 'Check',
          rules: [],
          type: 'select',
        },
        otherCheck: {
          display: false,
          label: 'Other check',
          rules: [],
          type: 'text',
        },
      },
    };
  },

  methods: {
    onAirlineChange(airline) {
      switch (airline) {
        case 'ASL':
          this.fields.tail = { ...this.fields.tail, prefix: 'EI-' };
          this.fields.otherAirline = {
            ...this.fields.otherAirline,
            display: false,
          };
          this.flightDetails.prefix = 'EI-';
          this.flightDetails.otherAirline = '';
          break;

        case 'PR':
          this.fields.tail = { ...this.fields.tail, prefix: 'RP-C' };
          this.fields.otherAirline = {
            ...this.fields.otherAirline,
            display: false,
          };
          this.flightDetails.prefix = 'RP-C';
          this.flightDetails.otherAirline = '';
          break;

        case 'CX':
        case 'KA':
        case 'LD':
          this.fields.tail = { ...this.fields.tail, prefix: 'B-' };
          this.fields.otherAirline = {
            ...this.fields.otherAirline,
            display: false,
          };
          this.flightDetails.prefix = 'B-';
          this.flightDetails.otherAirline = '';
          break;

        default:
          this.fields.tail = { ...this.fields.tail, prefix: '' };
          this.fields.otherAirline = {
            ...this.fields.otherAirline,
            display: true,
          };
          this.flightDetails.prefix = '';
          this.flightDetails.otherAirline = '';
      }
    },

    validateFlightDetails() {
      this.fields.fltno.rules = [v => !!v || 'Required.'];
      this.fields.tail.rules = [v => !!v || 'Required.'];
      this.fields.bay.rules = [v => !!v || 'Required.'];
      this.fields.check.rules = [v => !!v || 'Required.'];

      console.log(this.flightDetails);

      for (const key in this.fields) {
        if (this.fields[key].rules && this.fields[key].display) {
          this.$refs[key][0].validateField();
        }
      }
    },
  },

  computed: {
    airline: {
      get() {
        return 'CX';
      },
      set(airline) {
        this.onAirlineChange(airline);
      },
    },

    check: {
      get() {
        return '';
      },
      set(check) {
        this.flightDetails.check = check;
        if (check === 'Other') {
          this.fields.otherCheck = { ...this.fields.otherCheck, display: true };
        } else
          this.fields.otherCheck = {
            ...this.fields.otherCheck,
            display: false,
          };
      },
    },
  },

  created() {
    this.fields.tail.prefix = this.flightDetails.prefix;
  },
};
</script>

<style lang="scss" scoped></style>
