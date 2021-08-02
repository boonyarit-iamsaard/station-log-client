<template>
  <div class="mx-auto" style="max-width: 1248px">
    <div class="mb-4">
      <span class="title">Chargeable Services / Equipments</span>
    </div>

    <v-data-table
      :headers="headers"
      :items="normalizedFlights"
      :search="filters.search"
      :sort-by="['date', 'createdAt']"
      :sort-desc="[true, true]"
      class="shadow"
    >
      <template v-slot:top>
        <list-desktop-header
          :add-button="false"
          :export-button="true"
          @onExport="onExport"
          v-model="filters"
        />
      </template>

      <template v-slot:item.date="{ item }">
        {{ item.date | dateFormat }}
      </template>

      <template v-slot:item.airline="{ item }">
        <airline-avatar-wrapper :airline="item.airline" />
      </template>

      <template v-slot:item.service="{ item }">
        <div class="d-flex align-center">
          <span
            :class="
              item.service.length > 25
                ? 'd-inline-block text-truncate'
                : 'd-inline-block'
            "
            style="max-width: 250px"
          >
            {{ item.service }}
          </span>

          <v-chip
            @click="handleClickMore(item.service)"
            class="ml-2"
            label
            small
            v-if="item.service.length > 25"
          >
            <span class="caption font-weight-bold">more</span>
          </v-chip>
        </div>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-btn
          class="mr-2"
          icon
          link
          :to="{
            name: 'flight-edit',
            params: {
              id: item.flightID,
            },
          }"
        >
          <v-icon> mdi-pencil</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog max-width="400" v-model="dialog">
      <v-card>
        <v-card-title class="title pa-4"> Details </v-card-title>

        <v-card-text class="px-4 py-0">
          {{ service }}
        </v-card-text>

        <v-card-actions class="pa-4">
          <v-spacer />

          <v-btn color="primary" text @click="dialog = false"> Close </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import XLSX from 'xlsx';
import { mapActions, mapGetters } from 'vuex';

import AirlineAvatarWrapper from '@/components/shared/AirlineAvatarWrapper';
import ListDesktopHeader from '@/components/shared/ListDesktopHeader';

import { IDGenerator } from '@/utils/id-generator';
import { currentDate } from '@/utils/currentDate';
import { dateFormat } from '@/utils/dateFormat';

export default {
  name: 'AdminChargeableServiceList',

  components: {
    'airline-avatar-wrapper': AirlineAvatarWrapper,
    'list-desktop-header': ListDesktopHeader,
  },

  data() {
    return {
      dialog: false,
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
          width: 100,
        },
        {
          text: 'Service / Equipment',
          value: 'service',
        },
        {
          text: 'Usage (hours/fans)',
          value: 'usage',
          width: 80,
        },
        {
          text: 'Engineer (hours)',
          value: 'engineerHours',
          width: 80,
        },
        {
          text: 'Mechanic (hours)',
          value: 'mechanicHours',
          width: 80,
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
      service: '',
    };
  },

  methods: {
    ...mapActions({
      fetchFlights: 'flight/fetchFlights',
      setErrorMessage: 'error/setErrorMessage',
      setIsError: 'error/setIsError',
      setShouldLoading: 'setShouldLoading',
    }),

    handleClickMore(service) {
      this.dialog = true;
      this.service = service;
    },

    dateFilter(value) {
      const fromDate = new Date(this.filters.dateRange[0]);
      const toDate = new Date(this.filters.dateRange[1]);
      const valueDate = new Date(value);

      return fromDate <= valueDate && valueDate <= toDate;
    },

    async handleFetchFlights() {
      this.setShouldLoading(true);

      try {
        await this.fetchFlights().then(() => {
          this.setShouldLoading(false);
        });
      } catch (err) {
        this.setShouldLoading(false);

        await this.setIsError();
        await this.setErrorMessage(err.message);
      }
    },

    onExport() {
      const exportData = [];

      this.flights.forEach(flight => {
        const {
          date,
          airline,
          fltno,
          acreg,
          check1,
          check2,
          check3,
          chargeableServices,
          engineer,
        } = flight;

        if (this.dateFilter(date) && chargeableServices.length) {
          exportData.push({
            date,
            airline,
            fltno,
            acreg,
            check1,
            check2: check2 || '',
            check3: check3 || '',
            service: chargeableServices[0]?.service ?? '',
            usage: chargeableServices[0]?.usage ?? '',
            engineerHours: chargeableServices[0]?.engineerHours ?? 0,
            mechanicHours: chargeableServices[0]?.mechanicHours ?? 0,
            engineer: engineer,
          });

          if (chargeableServices.length > 1) {
            // Add more row with empty flight details when more than 1 chargeable services
            for (let i = 1; i <= chargeableServices.length - 1; i++) {
              exportData.push({
                date,
                airline,
                fltno,
                acreg,
                check1: '',
                check2: '',
                check3: '',
                service: chargeableServices[i]?.service ?? '',
                usage: chargeableServices[i]?.usage ?? '',
                engineerHours: chargeableServices[i]?.engineerHours ?? 0,
                mechanicHours: chargeableServices[i]?.mechanicHours ?? 0,
                engineer: '',
              });
            }
          }
        }
      });

      const WS = XLSX.utils.json_to_sheet(exportData);
      const WB = XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(WB, WS);
      XLSX.writeFile(WB, `chargeable-services-${currentDate()}.xlsx`);
    },
  },

  computed: {
    ...mapGetters({
      flights: 'flight/getFlights',
    }),

    normalizedFlights() {
      const normalizedFlights = [];

      this.flights.forEach(flight => {
        const {
          _id: flightID,
          date,
          airline,
          fltno,
          acreg,
          chargeableServices,
          engineer,
        } = flight;

        if (this.dateFilter(date) && chargeableServices.length) {
          chargeableServices.forEach(record => {
            const { service, usage, engineerHours, mechanicHours } = record;

            normalizedFlights.push({
              _id: IDGenerator(),
              flightID,
              date,
              airline,
              fltno,
              acreg,
              service,
              usage,
              engineerHours,
              mechanicHours,
              engineer,
            });
          });
        }
      });

      return normalizedFlights;
    },
  },

  filters: {
    dateFormat,
  },

  created() {
    if (this.flights.length === 0) {
      this.handleFetchFlights();
    }
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
