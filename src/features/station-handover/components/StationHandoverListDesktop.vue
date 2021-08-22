<template>
  <div class="mx-auto" style="max-width: 1248px">
    <div class="mb-4">
      <span class="title">Station Handover Record</span>
    </div>

    <v-data-table
      :expanded.sync="expanded"
      :headers="headers"
      :items="stationHandoverRecords"
      :search="filters.search"
      :single-expand="true"
      :sort-by="['date', 'createdAt']"
      :sort-desc="[true, true]"
      class="shadow"
      item-key="_id"
      show-expand
    >
      <template v-slot:top>
        <ListDesktopHeader link="/station-handover/create" v-model="filters" />
      </template>

      <template v-slot:item.recordDate="{ item }">
        <span>{{ item.recordDate | dateFormat }}</span>
      </template>

      <template v-slot:item.acknowledgedDate="{ item }">
        <span v-if="item.acknowledgedDate">
          {{ item.acknowledgedDate | dateFormat }}
        </span>

        <span v-else>Pending</span>
      </template>

      <template v-slot:item.acknowledgedBy="{ item }">
        <span v-if="item.acknowledgedBy">
          {{ item.acknowledgedBy }}
        </span>

        <span v-else>Pending</span>
      </template>

      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length" class="expanded-item grey lighten-4 pa-4">
          <span>{{ item.details }}</span>
        </td>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-btn
          class="mr-2"
          icon
          link
          :to="{
            name: 'station-handover-edit',
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
// Import components
import ListDesktopHeader from '@/components/shared/ListDesktopHeader.vue';

// Import utils
import { currentDate } from '@/utils/currentDate';
import { dateFormat } from '@/utils/dateFormat';

export default {
  name: 'StationHandoverListDesktop',

  components: {
    ListDesktopHeader,
  },

  props: {
    stationHandoverRecords: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      expanded: [],
      filters: {
        dateRange: ['2021-01-01', currentDate()],
        fromDate: '2021-01-01',
        search: '',
      },
      headers: [
        {
          text: 'Date',
          value: 'recordDate',
          width: 200,
          filter: value => this.dateFilter(value),
        },
        {
          text: 'Record By',
          value: 'recordBy',
          width: 200,
        },
        {
          text: 'Acknowledged Date',
          value: 'acknowledgedDate',
          width: 200,
        },
        {
          text: 'Acknowledged By',
          value: 'acknowledgedBy',
          width: 200,
        },
        {
          text: 'Details',
          value: 'data-table-expand',
          width: 200,
        },
        {
          text: 'Actions',
          value: 'actions',
          sortable: false,
          width: 200,
          align: 'end',
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

<style lang="scss" scoped>
::v-deep
  .v-data-table
  > .v-data-table__wrapper
  tbody
  tr.v-data-table__expanded__content {
  box-shadow: none;
}

.expanded-item {
  width: 100%;
  border-bottom: thin solid rgba(0, 0, 0, 0.12);
  white-space: pre-wrap;
}
</style>
