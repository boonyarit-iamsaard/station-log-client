<template>
  <div class="mx-auto" style="max-width: 1263px">
    <div class="mb-4">
      <span class="title">Flight Movement</span>
    </div>

    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
      :sort-by="['date', 'createdAt']"
      :sort-desc="[true, true]"
      class="shadow"
    >
      <template v-slot:top>
        <div class="d-flex pa-4">
          <input-text
            label="Search"
            prepend-inner-icon="mdi-magnify"
            v-model="search"
          />

          <v-spacer />

          <v-btn class="mt-6" color="primary" link to="/flights/create">
            Add New Flight
          </v-btn>
        </div>
      </template>

      <template v-slot:item.date="{ item }">
        {{ item.date }}
      </template>

      <template v-slot:item.fltno="{ item }">
        <v-chip color="error" v-if="item.assignedDelays.length > 0">
          <span>{{ item.fltno }}</span>
        </v-chip>

        <span v-else>{{ item.fltno }}</span>
      </template>

      <template v-slot:item.extraGroundEquipments="{ item }">
        <v-avatar class="grey lighten-3" size="32">
          <span class="caption">
            {{ extraGroundEquipments(item) }}
          </span>
        </v-avatar>
      </template>

      <template v-slot:item.tasks="{ item }">
        <v-avatar class="grey lighten-3" size="32">
          <span class="caption">
            {{ tasks(item) }}
          </span>
        </v-avatar>
      </template>

      <template v-slot:item.chargeableServices="{ item }">
        <v-avatar class="grey lighten-3" size="32">
          <span class="caption">
            {{ chargeableServices(item) }}
          </span>
        </v-avatar>
      </template>

      <template v-slot:item.mechanic1="{ item }">
        {{ mechanic(item) }}
      </template>

      <template v-slot:item.actions="{ item }">
        <v-btn
          class="mr-2"
          icon
          link
          :to="{
            name: 'flight-edit',
            params: { id: item._id },
          }"
        >
          <v-icon> mdi-pencil</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { format } from 'date-fns';

import InputText from '@/components/shared/input/InputText';

export default {
  name: 'FlightsListDesktop',

  components: {
    'input-text': InputText,
  },

  props: {
    flights: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      airlines: ['ASL', 'CX', 'KA', 'LD', 'PR'],
      filters: {
        airline: 'ALL',
      },
      headers: [
        { text: 'Date', value: 'date' },
        {
          text: 'Airline',
          value: 'airline',
        },
        {
          text: 'Flt No.',
          value: 'fltno',
        },
        {
          text: 'A/C Reg.',
          value: 'acreg',
        },
        {
          text: 'Bay',
          value: 'bay',
        },
        {
          text: 'Check-1',
          value: 'check1',
        },
        {
          text: 'Check-2',
          value: 'check2',
        },
        {
          text: 'Extra Equipment',
          value: 'extraGroundEquipments',
          width: 100,
        },
        {
          text: 'Tasks',
          value: 'tasks',
        },
        {
          text: 'Chargeable Services',
          value: 'chargeableServices',
          width: 100,
        },
        {
          text: 'Mechanic',
          value: 'mechanic1',
        },
        {
          text: 'Engineer',
          value: 'engineer',
        },
        {
          text: 'Actions',
          value: 'actions',
          sortable: false,
        },
      ],
      items: [],
      search: '',
    };
  },

  methods: {
    chargeableServices(item) {
      return item.chargeableServices.length > 0
        ? item.chargeableServices.length
        : 'N/A';
    },

    extraGroundEquipments(item) {
      return item.extraGroundEquipments.length > 0
        ? item.extraGroundEquipments.length
        : 'N/A';
    },

    mechanic(item) {
      return item.mechanic2
        ? item.mechanic1 + ' / ' + item.mechanic2
        : item.mechanic1;
    },

    tasks(item) {
      return item.tasks.length > 0 ? item.tasks.length : 'N/A';
    },
  },

  filters: {
    dateFormat: function (date) {
      return format(new Date(date), 'dd MMM yy');
    },
  },

  created() {
    this.items = this.flights;
  },
};
</script>

<style scoped>
::v-deep th > span {
  display: block;
}

::v-deep th {
  height: auto !important;
  padding-top: 8px !important;
  vertical-align: top !important;
}
</style>
