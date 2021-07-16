<template>
  <div class="mx-auto" style="max-width: 1263px">
    <div class="mb-4">
      <span class="title">Spare Movement</span>
    </div>

    <v-data-table
      :headers="headers"
      :items="spares"
      :search="filters.search"
      :sort-by="['date', 'createdAt']"
      :sort-desc="[true, true]"
      class="shadow"
    >
      <template v-slot:top>
        <list-desktop-header link="/spares/create" v-model="filters" />
      </template>

      <template v-slot:item.date="{ item }">
        {{ item.date | dateFormat }}
      </template>

      <template v-slot:item.displayType="{ item }">
        <v-avatar :color="setSpareTypeColorHandler(item.type)" size="32">
          <span class="white--text">{{ item.type.substr(0, 1) }}</span>
        </v-avatar>
      </template>

      <template v-slot:item.displayStatus="{ item }">
        <v-icon :color="setSpareStatusHandler(item.type, item.status).color">
          {{ setSpareStatusHandler(item.type, item.status).icon }}
        </v-icon>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-btn
          class="mr-2"
          icon
          link
          :to="{
            name: 'spares-edit',
            params: { id: item._id },
          }"
        >
          <v-icon> mdi-pencil </v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import ListDesktopHeader from '@/components/shared/ListDesktopHeader';

import { dateFormat } from '@/utils/dateFormat';

export default {
  name: 'SparesListDesktop',

  components: {
    'list-desktop-header': ListDesktopHeader,
  },

  props: {
    spares: {
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
          text: 'Type',
          value: 'type',
          cellClass: 'd-none',
          class: 'd-none',
        },
        {
          text: 'Type',
          value: 'displayType',
        },
        {
          text: 'Part No.',
          value: 'part',
        },
        {
          text: 'Description',
          value: 'desc',
        },
        {
          text: 'Store',
          value: 'store',
        },
        {
          text: 'Status',
          value: 'displayStatus',
        },
        {
          text: 'Status',
          value: 'status',
          cellClass: 'd-none',
          class: 'd-none',
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

    setSpareTypeColorHandler(type) {
      switch (type) {
        case 'Consumable':
          return 'primary';
        case 'Return':
          return 'error';
        default:
          return 'secondary';
      }
    },

    setSpareStatusHandler(type, status) {
      switch (type) {
        case 'Return':
          switch (status) {
            case 'Transferred':
              return { icon: 'mdi-check-circle-outline', color: 'primary' };
            case 'Returned':
              return {
                icon: 'mdi-alert-circle-check-outline',
                color: 'info',
              };
            case 'Issued':
              return {
                icon: 'mdi-alert-circle-check-outline',
                color: 'secondary',
              };
            default:
              return { icon: 'mdi-alert-circle-outline', color: 'error' };
          }
        default:
          switch (status) {
            case 'Issued':
              return { icon: 'mdi-check-circle-outline', color: 'primary' };
            default:
              return { icon: 'mdi-alert-circle-outline', color: 'error' };
          }
      }
    },
  },

  filters: {
    dateFormat,
  },
};
</script>

<style lang="scss" scoped>
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
