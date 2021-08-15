<template>
  <div class="mx-auto" style="max-width: 1248px">
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
        <list-desktop-header
          :export-button="admin"
          @onExport="onExport"
          link="/spares/create"
          v-model="filters"
        />
      </template>

      <template v-slot:item.date="{ item }">
        {{ item.date | dateFormat }}
      </template>

      <template v-slot:item.airline="{ item }">
        <airline-avatar-wrapper :airline="item.airline" />
      </template>

      <template v-slot:item.displayType="{ item }">
        <v-avatar :class="setSpareTypeColorHandler(item.type)" size="32">
          <span class="caption white--text">{{ item.type.substr(0, 1) }}</span>
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
import XLSX from 'xlsx';
import { mapGetters } from 'vuex';

import AirlineAvatarWrapper from '@/components/shared/AirlineAvatarWrapper';
import ListDesktopHeader from '@/components/shared/ListDesktopHeader';

import { dateFormat } from '@/utils/dateFormat';
import { currentDate } from '@/utils/currentDate';

export default {
  name: 'SparesListDesktop',

  components: {
    'airline-avatar-wrapper': AirlineAvatarWrapper,
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
        dateRange: ['2021-01-01', currentDate()],
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
          width: 80,
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
          width: 80,
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
          text: 'Qty.',
          value: 'qty',
          width: 80,
        },
        {
          text: 'Store',
          value: 'store',
          width: 80,
        },
        {
          text: 'Status',
          value: 'displayStatus',
          width: 80,
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
          width: 80,
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

    onExport() {
      const exportData = [];

      this.spares.forEach(spare => {
        const {
          date,
          airline,
          fltno,
          prefix,
          tail,
          acreg,
          part,
          desc,
          serial,
          grn,
          qty,
          type,
          store,
          status,
          usedBy,
        } = spare;

        if (this.dateFilter(date)) {
          exportData.push({
            date,
            airline,
            fltno,
            prefix,
            tail,
            acreg,
            part,
            desc,
            serial,
            grn,
            qty,
            type,
            store,
            status,
            usedBy,
          });
        }
      });

      const WS = XLSX.utils.json_to_sheet(exportData);
      const WB = XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(WB, WS);
      XLSX.writeFile(WB, `spares-${currentDate()}.xlsx`);
    },

    setSpareTypeColorHandler(type) {
      switch (type) {
        case 'Consumable':
          return 'indigo darken-3';
        case 'Return':
          return 'orange darken-4';
        default:
          return 'grey';
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

  computed: {
    ...mapGetters({
      admin: 'auth/getIsAdmin',
    }),
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
