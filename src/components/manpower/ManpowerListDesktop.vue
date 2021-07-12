<template>
  <div class="mx-auto" style="max-width: 1263px">
    <div class="mb-4">
      <span class="title">Sick leave / OT Record</span>
    </div>

    <v-data-table
      :headers="headers"
      :items="manpowerRecords"
      :search="search"
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
        <div class="d-flex pa-4">
          <input-text
            label="Search"
            prepend-inner-icon="mdi-magnify"
            v-model="search"
          />

          <v-spacer />

          <v-btn class="mt-6" color="primary" link to="/manpower/create">
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
import { format } from 'date-fns';

import InputText from '@/components/shared/input/InputText';

export default {
  name: 'ManpowerListDesktop',

  components: {
    'input-text': InputText,
  },

  props: {
    manpowerRecords: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
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
      search: '',
    };
  },

  filters: {
    dateFormat: function (date) {
      return format(new Date(date), 'dd MMM yy');
    },
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
