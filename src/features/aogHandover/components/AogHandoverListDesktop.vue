<template>
  <div class="mx-auto" style="max-width: 1248px">
    <div class="mb-4">
      <span class="title">AOG Handover Record</span>
    </div>

    <v-data-table
      :expanded.sync="expanded"
      :headers="headers"
      :items="aogHandoverRecords"
      :search="filters.search"
      :single-expand="true"
      :sort-by="['recordDate', 'createdAt']"
      :sort-desc="[true, true]"
      class="shadow"
      item-key="_id"
      show-expand
    >
      <template v-slot:top>
        <ListDesktopHeader
          checkbox
          checkbox-label="Pending"
          link="/aog-handover/create"
          v-model="filters"
        />
      </template>

      <template v-slot:item.fltDate="{ item }">
        <span>{{ item.fltDate | dateFormat }}</span>
      </template>

      <template v-slot:item.status="{ item }">
        <span>
          <v-icon v-if="isAcknowledged(item.details)" color="primary">
            mdi-check-circle-outline
          </v-icon>

          <v-icon v-else color="error"> mdi-alert-circle-outline </v-icon>
        </span>
      </template>

      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length" class="expanded-item px-4 pt-4 pb-0">
          <div class="details-container">
            <v-card
              class="grey lighten-4 pa-4 mb-4"
              elevation="0"
              :key="detail._id"
              v-for="detail in item.details"
            >
              <span class="caption d-block">
                Record by :
                {{ detail.recordBy }} on
                {{ detail.recordDate | dateFormat }}
              </span>

              <span class="caption d-block" v-if="detail.acknowledgedBy">
                Acknowledged by :
                {{ detail.acknowledgedBy }} on
                {{ detail.acknowledgedDate | dateFormat }}
              </span>

              <span class="body-2 mt-2 remark">{{ detail.details }} </span>
            </v-card>
          </div>
        </td>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-btn
          class="mr-2"
          icon
          link
          :to="{
            name: 'aog-handover-edit',
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
  name: 'AogHandoverListDesktop',

  components: {
    ListDesktopHeader,
  },

  props: {
    aogHandoverRecords: {
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
          value: 'fltDate',
          width: 120,
          filter: value => this.dateFilter(value),
        },
        {
          text: 'Airline',
          value: 'airline',
          width: 120,
        },
        {
          text: 'Details',
          value: 'details',
          width: 120,
          filter: value =>
            this.filters.checked
              ? value.some(detail => !detail.isAcknowledged)
              : true,
          class: 'd-none',
          cellClass: 'd-none',
        },
        {
          text: 'Flt No.',
          value: 'fltno',
          width: 160,
        },
        {
          text: 'A/C Reg.',
          value: 'acreg',
          width: 160,
        },
        {
          text: 'Status',
          value: 'status',
          width: 120,
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

  computed: {
    isAcknowledged() {
      return function (details) {
        return details.every(detail => detail.isAcknowledged);
      };
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
}

.details-container {
  max-height: 300px;
  overflow-y: auto;
}

.remark {
  white-space: pre-wrap;
}
</style>
