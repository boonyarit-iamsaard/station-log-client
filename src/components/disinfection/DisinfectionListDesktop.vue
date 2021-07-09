<template>
  <div class="mx-auto" style="max-width: 1263px">
    <div class="mb-4">
      <span class="title">Cabin Disinfection Record</span>
    </div>

    <v-data-table
      :headers="headers"
      :items="disinfectionList"
      :search="search"
      :sort-desc="[true, false]"
      :sort-by="['date', 'airline']"
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

          <v-btn class="mt-6" color="primary" link to="/disinfection/create">
            Add New Record
          </v-btn>
        </div>
      </template>

      <template v-slot:item.date="{ item }">
        {{ item.date }}
      </template>

      <template v-slot:item.actions="{ item }">
        <v-btn
          class="mr-2"
          icon
          link
          :to="{
            name: 'disinfection-edit',
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
  name: 'DisinfectionListDesktop',

  components: {
    'input-text': InputText,
  },

  props: {
    disinfectionList: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
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
          text: 'A/C Type',
          value: 'aircraftType',
        },
        {
          text: 'Start at',
          value: 'startAt',
        },
        {
          text: 'End at',
          value: 'endAt',
        },
        {
          text: 'Used',
          value: 'chemicalUsage',
        },
        {
          text: 'Mechanic-1',
          value: 'mechanic1',
        },
        {
          text: 'Mechanic-2',
          value: 'mechanic2',
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

  filters: {
    dateFormat: function (date) {
      return format(new Date(date), 'dd MMM yy');
    },
  },
  //
  // created() {
  //   this.items = this.disinfectionList;
  // },
};
</script>

<style scoped>
::v-deep th > span {
  display: block;
}

::v-deep th {
  height: auto !important;
  /*padding-top: 8px !important;*/
  padding: 8px 16px !important;
  vertical-align: top !important;
}

/*::v-deep td {*/
/*  padding: 0 8px !important;*/
/*}*/
</style>