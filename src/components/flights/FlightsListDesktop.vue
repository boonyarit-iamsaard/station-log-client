<template>
  <div class="mx-auto" style="max-width: 1248px">
    <div class="mb-4">
      <span class="title">Flight Movement</span>
    </div>

    <v-data-table
      :headers="headers"
      :items="flights"
      :search="filters.search"
      :sort-by="['date', 'createdAt']"
      :sort-desc="[true, true]"
      class="shadow"
    >
      <template v-slot:top>
        <list-desktop-header
          :export-button="admin"
          @onExport="onExport"
          link="/flights/create"
          v-model="filters"
        />
      </template>

      <template v-slot:item.date="{ item }">
        {{ item.date | dateFormat }}
      </template>

      <template v-slot:item.airline="{ item }">
        <airline-avatar-wrapper :airline="item.airline" />
      </template>

      <template v-slot:item.fltno="{ item }">
        <span>
          {{ item.fltno }}
        </span>

        <span
          class="caption error--text font-weight-bold"
          v-if="item.assignedDelays.length"
        >
          delayed
        </span>
      </template>

      <template v-slot:item.check="{ item }">
        <span>{{ check(item) }}</span>
      </template>

      <template v-slot:item.extraGroundEquipments="{ item }">
        <v-avatar
          class="secondary"
          size="32"
          v-if="item.extraGroundEquipments.length"
        >
          <span class="caption white--text">
            {{ item.extraGroundEquipments.length }}
          </span>
        </v-avatar>
      </template>

      <template v-slot:item.tasks="{ item }">
        <v-avatar class="info" size="32" v-if="item.tasks.length">
          <span class="caption white--text">
            {{ item.tasks.length }}
          </span>
        </v-avatar>
      </template>

      <template v-slot:item.chargeableServices="{ item }">
        <v-avatar
          class="grey lighten-1"
          size="32"
          v-if="item.chargeableServices.length"
        >
          <span class="caption white--text">
            {{ item.chargeableServices.length }}
          </span>
        </v-avatar>
      </template>

      <template v-slot:item.mechanic="{ item }">
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
import XLSX from 'xlsx';
import { mapGetters } from 'vuex';

import AirlineAvatarWrapper from '@/components/shared/AirlineAvatarWrapper';
import ListDesktopHeader from '@/components/shared/ListDesktopHeader';

import { dateFormat } from '@/utils/dateFormat';
import { currentDate } from '@/utils/currentDate';

export default {
  name: 'FlightsListDesktop',

  components: {
    'airline-avatar-wrapper': AirlineAvatarWrapper,
    'list-desktop-header': ListDesktopHeader,
  },

  props: {
    flights: {
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
          text: 'A/C Reg.',
          value: 'acreg',
        },
        {
          text: 'Bay',
          value: 'bay',
        },
        {
          text: 'Check',
          value: 'check',
        },
        {
          text: 'Check-1',
          value: 'check1',
          cellClass: 'd-none',
          class: 'd-none',
        },
        {
          text: 'Check-2',
          value: 'check2',
          cellClass: 'd-none',
          class: 'd-none',
        },
        {
          text: 'Check-3',
          value: 'check3',
          cellClass: 'd-none',
          class: 'd-none',
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
          value: 'mechanic',
        },
        {
          text: 'Mechanic-1',
          value: 'mechanic1',
          cellClass: 'd-none',
          class: 'd-none',
        },
        {
          text: 'Mechanic-2',
          value: 'mechanic2',
          cellClass: 'd-none',
          class: 'd-none',
        },
        {
          text: 'Engineer',
          value: 'engineer',
          width: 100,
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
    check(item) {
      const { check1, check2, check3 } = item;

      if (!check1) return '';

      if (check1 && check2 && !check3) return `${check1} / ${check2}`;

      if (check1 && check2 && check3)
        return `${check1} / ${check2} / ${check3}`;

      return check1;
    },

    dateFilter(value) {
      const fromDate = new Date(this.filters.dateRange[0]);
      const toDate = new Date(this.filters.dateRange[1]);
      const valueDate = new Date(value);

      return fromDate <= valueDate && valueDate <= toDate;
    },

    onExport() {
      const exportData = [];
      const exportCheckData = [];

      this.flights.forEach(flight => {
        const {
          date,
          airline,
          fltno,
          prefix,
          tail,
          acreg,
          ata,
          atd,
          bay,
          check1,
          check2,
          check3,
          afac,
          water,
          lavatory,
          remark,
          engineer,
          mechanic1,
          mechanic2,
          recordBy,
          tasks,
        } = flight;
        const deferrals = {
          pkg: 0,
          padd: 0,
          sadd: 0,
          add: 0,
          zadd: 0,
          cadd: 0,
          madd: 0,
          worked: 0,
        };

        if (check1) {
          exportCheckData.push({
            date,
            airline,
            fltno,
            acreg,
            check: check1,
          });
        }

        if (check2) {
          exportCheckData.push({
            date,
            airline,
            fltno,
            acreg,
            check: check2,
          });
        }

        if (check3) {
          exportCheckData.push({
            date,
            airline,
            fltno,
            acreg,
            check: check3,
          });
        }

        if (tasks.length) {
          tasks.forEach(task => {
            if (task.taskNo) {
              deferrals.pkg += 1;
            }

            if (task.deferralAction === 'Cleared') {
              const { deferral } = task;

              Object.keys(deferrals).forEach(key => {
                if (key === deferral.toLowerCase()) {
                  deferrals[key] += 1;
                }
              });
            }

            if (task.deferralAction === 'Worked') {
              deferrals.worked += 1;
            }
          });
        }

        if (this.dateFilter(date)) {
          exportData.push({
            date,
            airline,
            fltno,
            prefix,
            tail,
            acreg,
            ata,
            atd,
            bay,
            check1,
            check2: check2 ?? '',
            check3: check3 ?? '',
            afac,
            water,
            lavatory,
            ...deferrals,
            remark,
            engineer,
            mechanic1,
            mechanic2: mechanic2 ?? '',
            recordBy,
          });
        }
      });

      const WC = XLSX.utils.json_to_sheet(exportCheckData);
      const WS = XLSX.utils.json_to_sheet(exportData);
      const WB = XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(WB, WS);
      XLSX.utils.book_append_sheet(WB, WC);
      XLSX.writeFile(WB, `flights-${currentDate()}.xlsx`);
    },

    mechanic(item) {
      const { mechanic1, mechanic2 } = item;

      return mechanic2 ? `${mechanic1} / ${mechanic2}` : mechanic1;
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
