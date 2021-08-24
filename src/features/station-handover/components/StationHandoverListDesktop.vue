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
      :sort-by="['isAcknowledged', 'recordDate', 'createdAt']"
      :sort-desc="[false, true, true]"
      class="shadow"
      item-key="_id"
      show-expand
    >
      <template v-slot:top>
        <ListDesktopHeader
          checkbox
          checkbox-label="Pending"
          link="/station-handover/create"
          v-model="filters"
        />
      </template>

      <template v-slot:item.recordDate="{ item }">
        <span>{{ item.recordDate | dateFormat }}</span>
      </template>

      <template v-slot:item.isAcknowledged="{ item }">
        <span>
          <v-icon v-if="item.isAcknowledged" color="primary">
            mdi-check-circle-outline
          </v-icon>

          <v-icon v-else color="error"> mdi-alert-circle-outline </v-icon>
        </span>
      </template>

      <template v-slot:item.acknowledgedDate="{ item }">
        <span v-if="item.acknowledgedDate">
          {{ item.acknowledgedDate | dateFormat }}
        </span>

        <span v-else></span>
      </template>

      <template v-slot:item.acknowledgedBy="{ item }">
        <span v-if="item.acknowledgedBy">
          {{ item.acknowledgedBy }}
        </span>

        <span v-else></span>
      </template>

      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length" class="expanded-item px-4 pt-4 pb-0">
          <v-card class="grey lighten-4 pa-4 mb-4" elevation="0">
            <span class="caption d-block">
              Record by :
              {{ item.recordBy }} on
              {{ item.recordDate | dateFormat }}
            </span>

            <span class="caption d-block" v-if="item.acknowledgedBy">
              Acknowledged by :
              {{ item.acknowledgedBy }} on
              {{ item.acknowledgedDate | dateFormat }}
            </span>

            <span class="body-2 mt-2 remark">{{ item.details }} </span>
          </v-card>
        </td>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-btn
          class="mr-2"
          icon
          link
          :to="{
            name: 'station-handover-edit',
            params: {
              fromPath: $route.fullPath,
              id: item._id,
            },
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
        checked: false,
        dateRange: ['2021-01-01', currentDate()],
        fromDate: '2021-01-01',
        search: '',
      },
      headers: [
        {
          text: 'Date',
          value: 'recordDate',
          width: 120,
          filter: value => this.dateFilter(value),
        },
        {
          text: 'Record By',
          value: 'recordBy',
          width: 120,
        },
        {
          text: 'Status',
          value: 'isAcknowledged',
          width: 120,
          filter: value => (this.filters.checked ? !value : true),
        },
        {
          text: 'Acknowledged Date',
          value: 'acknowledgedDate',
          width: 160,
        },
        {
          text: 'Acknowledged By',
          value: 'acknowledgedBy',
          width: 160,
        },
        {
          text: 'Details',
          value: 'data-table-expand',
          width: 120,
        },
        {
          text: 'Actions',
          value: 'actions',
          sortable: false,
          align: 'end',
          width: 100,
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
//noinspection ALL
::v-deep
  .v-data-table
  > .v-data-table__wrapper
  tbody
  tr.v-data-table__expanded__content {
  box-shadow: none;
}

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

.expanded-item {
  width: 100%;
  border-bottom: thin solid rgba(0, 0, 0, 0.12);
  white-space: pre-wrap;
}

.remark {
  white-space: pre-wrap;
}
</style>
