<template>
  <div class="mx-auto" style="max-width: 1248px">
    <div class="mb-4">
      <span class="title">Cabin Disinfection Record</span>
    </div>

    <v-data-table
      :headers="headers"
      :items="disinfectionList"
      :search="filters.search"
      :sort-by="['date', 'createdAt']"
      :sort-desc="[true, true]"
      class="shadow"
    >
      <template v-slot:top>
        <list-desktop-header link="/disinfection/create" v-model="filters" />
      </template>

      <template v-slot:item.date="{ item }">
        <span>{{ item.date | dateFormat }}</span>
      </template>

      <template v-slot:item.airline="{ item }">
        <airline-avatar-wrapper :airline="item.airline" />
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
import AirlineAvatarWrapper from '@/components/shared/AirlineAvatarWrapper';
import ListDesktopHeader from '@/components/shared/ListDesktopHeader';

import { dateFormat } from '@/utils/dateFormat';

export default {
  name: 'DisinfectionListDesktop',

  components: {
    'airline-avatar-wrapper': AirlineAvatarWrapper,
    'list-desktop-header': ListDesktopHeader,
  },

  props: {
    disinfectionList: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      filters: {
        dateRange: ['2021-01-01', new Date().toISOString().substr(0, 10)],
        fromDate: '2021-01-01',
        search: '',
      },
      headers: [
        {
          text: 'Date',
          value: 'date',
          width: 120,
          filter: value => this.dateFilter(value),
        },
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
    };
  },

  methods: {
    dateFilter(value) {
      const fromDate = new Date(this.filters.dateRange[0]);
      const toDate = new Date(this.filters.dateRange[1]);
      const valueDate = new Date(value);

      return fromDate <= valueDate && valueDate <= toDate;
    },
  },

  filters: {
    dateFormat,
  },
};
</script>

<style scoped>
::v-deep th > span {
  display: block;
}

::v-deep th {
  color: rgba(0, 0, 0, 0.87) !important;
  font-size: 0.8rem;
  height: auto !important;
  padding: 8px 16px !important;
  vertical-align: top !important;
}
</style>
