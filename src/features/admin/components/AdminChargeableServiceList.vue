<template>
  <div class="mx-auto" style="max-width: 1263px">
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

import ListDesktopHeader from '@/components/shared/ListDesktopHeader';

import { IDGenerator } from '@/utils/id-generator';
import { dateFormat } from '@/utils/dateFormat';

export default {
  name: 'AdminChargeableServiceList',

  components: {
    'list-desktop-header': ListDesktopHeader,
  },

  data() {
    return {
      dialog: false,
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
          width: 80,
        },
        {
          text: 'Flt No.',
          value: 'fltno',
          width: 100,
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
      const currentDate = new Date().toISOString().substr(0, 10);
      const exportData = [];

      this.normalizedFlights.forEach(flight => {
        if (this.dateFilter(flight.date)) {
          exportData.push({
            date: flight.date,
            airline: flight.airline,
            fltno: flight.fltno,
            acreg: flight.acreg,
            service: flight.service,
            usage: flight.usage,
            engineerHours: flight.engineerHours,
            mechanicHours: flight.mechanicHours,
            engineer: flight.engineer,
          });
        }
      });

      const WS = XLSX.utils.json_to_sheet(exportData);
      const WB = XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(WB, WS);
      XLSX.writeFile(WB, `chargeable-services-${currentDate}.xlsx`);
    },
  },

  computed: {
    ...mapGetters({
      flights: 'flight/getFlights',
    }),

    normalizedFlights() {
      const normalizedFlights = [];

      this.flights.forEach(flight => {
        if (flight.chargeableServices.length) {
          flight.chargeableServices.forEach(service => {
            normalizedFlights.push({
              _id: IDGenerator(),
              flightID: flight._id,
              date: flight.date,
              airline: flight.airline,
              fltno: flight.fltno,
              acreg: flight.acreg,
              service: service.service,
              usage: service.usage,
              engineerHours: service.engineerHours,
              mechanicHours: service.mechanicHours,
              engineer: flight.engineer,
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
