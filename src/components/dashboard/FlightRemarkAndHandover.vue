<template>
  <div class="mt-8">
    <div class="mb-2">
      <span class="subtitle-1">Flight Remark / Handover</span>
    </div>

    <v-data-iterator
      :items-per-page.sync="itemsPerPage"
      :items="flightRemarkAndHandover"
      :page.sync="page"
      :sort-by="['date', 'createdAt']"
      :sort-desc="[true, true]"
      class="mb-14"
      hide-default-footer
      v-if="flightRemarkAndHandover.length > 0"
    >
      <template v-slot:default="{ items }">
        <v-row class="mx-0 mt-0 mb-4" justify="center">
          <v-expansion-panels>
            <v-expansion-panel
              class="shadow"
              v-for="item in items"
              :key="item._id"
            >
              <v-expansion-panel-header class="pa-4">
                <div class="d-flex">
                  <v-avatar
                    :color="setAvatarColor(item.airline)"
                    class="white--text mr-4"
                    size="32"
                  >
                    <span class="body-2">
                      {{ item.airline }}
                    </span>
                  </v-avatar>

                  <div style="min-width: 150px">
                    <span class="subtitle-1 mr-4">
                      {{ item.fltno }} / {{ item.acreg }}
                    </span>
                  </div>

                  <span>
                    <v-icon v-if="item.acknowledgedBy" color="primary">
                      mdi-account
                    </v-icon>

                    <v-icon v-else class="grey-text lighten-3">
                      mdi-account-clock
                    </v-icon>
                  </span>
                </div>

                <div class="d-flex align-end flex-column mr-4">
                  <span class="caption">{{ item.date | dateFormat }} </span>

                  <span class="caption">{{ item.engineer }}</span>
                </div>
              </v-expansion-panel-header>

              <v-expansion-panel-content>
                <v-row class="ma-0">
                  <v-col class="pa-0" cols="12">
                    <div class="d-block">
                      <span class="body-2 font-weight-bold">
                        Remark / Handover
                      </span>

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
                    </div>

                    <span class="body-2 remark">{{ item.remark }}</span>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-pagination
          :length="calculatePageLength"
          :total-visible="5"
          circle
          v-model="page"
        />
      </template>
    </v-data-iterator>

    <v-card class="shadow" v-if="flightRemarkAndHandover.length === 0">
      <v-card-text>
        <span> No flight remark / handover found. </span>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { dateFormat } from '@/utils/dateFormat';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'FlightRemarkAndHandover',

  data() {
    return {
      itemsPerPage: 5,
      itemsPerPageArray: [5, 10, 20],
      page: 1,
    };
  },

  methods: {
    ...mapActions({
      fetchFlights: 'flight/fetchFlights',
      setErrorMessage: 'error/setErrorMessage',
      setIsError: 'error/setIsError',
      setShouldLoading: 'setShouldLoading',
    }),

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

    setAvatarColor(airline) {
      switch (airline) {
        case 'CX':
          return 'primary';
        case 'LD':
          return 'error';
        case 'PR':
          return 'secondary';
        default:
          return 'info';
      }
    },
  },

  computed: {
    ...mapGetters({
      flights: 'flight/getFlights',
    }),

    calculatePageLength() {
      const defaultLength = 5;
      const calculatedLength =
        this.flightRemarkAndHandover.length / defaultLength;

      return calculatedLength < 1 ? 1 : Math.ceil(calculatedLength);
    },

    flightRemarkAndHandover() {
      return this.flights.filter(flight => flight.remark !== '');
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
::v-deep .v-expansion-panel::before {
  box-shadow: none;
}
.remark {
  white-space: pre-wrap;
}
</style>
