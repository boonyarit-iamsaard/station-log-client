<template>
  <div class="mx-auto" style="max-width: 1263px">
    <div class="mb-4">
      <span class="title">Sick leave / OT Record</span>
    </div>

    <v-data-table
      :headers="headers"
      :items="manpowerRecords"
      :search="filters.search"
      :sort-by="['date', 'createdAt']"
      :sort-desc="[true, true]"
      class="shadow"
    >
      <template v-slot:header>
        <thead>
          <tr>
            <th style="border-bottom: none" colspan="1" />

            <th colspan="3">Sick leave details</th>

            <th colspan="3">OT details</th>

            <th style="border-bottom: none" colspan="1" />
          </tr>
        </thead>
      </template>

      <template v-slot:top>
        <list-desktop-header link="/manpower/create" v-model="filters" />
      </template>

      <template v-slot:item.date="{ item }">
        {{ item.date | dateFormat }}
      </template>

      <template v-slot:item.actions="{ item }">
        <v-btn
          class="mr-2"
          icon
          link
          :to="{
            name: 'manpower-edit',
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
import ListDesktopHeader from '@/components/shared/ListDesktopHeader';

import { dateFormat } from '@/utils/dateFormat';

export default {
  name: 'ManpowerListDesktop',

  components: {
    'list-desktop-header': ListDesktopHeader,
  },

  props: {
    manpowerRecords: {
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
        { text: 'Date', value: 'date' },
        {
          text: 'Shift',
          value: 'sickLeaveDetails.shift',
        },
        {
          text: 'Name',
          value: 'sickLeaveDetails.name',
        },
        {
          text: 'Received by',
          value: 'sickLeaveDetails.receivedBy',
        },
        {
          text: 'Shift',
          value: 'overTimeDetails.shift',
        },
        {
          text: 'Name',
          value: 'overTimeDetails.name',
        },
        {
          text: 'Required by',
          value: 'overTimeDetails.requiredBy',
        },
        {
          text: 'Actions',
          value: 'actions',
          sortable: false,
        },
      ],
    };
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
