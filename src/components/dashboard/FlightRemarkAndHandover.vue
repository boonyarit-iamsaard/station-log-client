<!--suppress CssUnusedSymbol -->
<template>
  <div class="mt-4">
    <div class="d-flex align-center justify-space-between">
      <span class="font-weight-bold mr-4 subtitle-1">
        Flight Remark / Handover
      </span>

      <v-checkbox v-model="isPending">
        <template v-slot:label>
          <span class="caption">Pending</span>
        </template>
      </v-checkbox>
    </div>

    <v-data-iterator
      :items-per-page.sync="itemsPerPage"
      :items="flightRemarkAndHandover"
      :page.sync="page"
      :sort-by="['date', 'createdAt']"
      :sort-desc="[true, true]"
      :class="$route.path === '/' ? 'mb-4' : 'mb-14'"
      hide-default-footer
      v-if="flightRemarkAndHandover.length > 0"
    >
      <template v-slot:default="{ items }">
        <v-row class="ma-0" justify="center">
          <v-expansion-panels>
            <v-expansion-panel
              class="shadow mb-4 rounded"
              v-for="item in items"
              :key="item._id"
            >
              <v-expansion-panel-header
                :hide-actions="$vuetify.breakpoint.xs"
                class="align-stretch align-sm-center flex-column flex-sm-row px-4 py-2"
              >
                <div
                  class="d-flex justify-space-between justify-sm-start align-center"
                >
                  <div class="d-flex align-center">
                    <v-avatar
                      :color="setAvatarColor(item.airline)"
                      class="white--text mr-4"
                      size="32"
                    >
                      <span class="body-2">
                        {{ item.airline }}
                      </span>
                    </v-avatar>

                    <span class="subtitle-1 mr-4">
                      {{ item.fltno }} / {{ item.acreg }}
                    </span>
                  </div>

                  <div>
                    <v-icon v-if="item.isAcknowledged" color="primary">
                      mdi-check-circle-outline
                    </v-icon>

                    <v-icon v-if="!item.remark" color="grey lighten-2">
                      mdi-check-circle-outline
                    </v-icon>

                    <v-icon
                      v-if="!item.isAcknowledged && item.remark"
                      color="error"
                    >
                      mdi-alert-circle-outline
                    </v-icon>
                  </div>
                </div>

                <div
                  class="d-flex justify-xs-start mt-2 mt-sm-0 mr-sm-4 justify-sm-end"
                >
                  <span class="caption">
                    {{ item.date | dateFormat }} / {{ item.engineer }}
                  </span>
                </div>
              </v-expansion-panel-header>

              <v-expansion-panel-content>
                <v-row class="ma-0">
                  <v-col class="pa-0" cols="12">
                    <div class="d-block">
                      <span class="body-2 font-weight-bold">
                        Remark / Handover Details
                      </span>

                      <v-btn
                        class="mr-2"
                        icon
                        link
                        :to="{
                          name: 'flight-edit',
                          params: {
                            fromPath: $route.fullPath,
                            id: item._id,
                          },
                        }"
                      >
                        <v-icon> mdi-pencil</v-icon>
                      </v-btn>
                    </div>

                    <v-card class="grey lighten-4 pa-4 mb-4" elevation="0">
                      <span class="caption d-block">
                        Record by :
                        {{ item.engineer }} on
                        {{ item.date | dateFormat }}
                      </span>

                      <span class="caption d-block" v-if="item.acknowledgedBy">
                        Acknowledged by :
                        {{ item.acknowledgedBy }} on
                        {{ item.acknowledgedDate | dateFormat }}
                      </span>

                      <span class="body-2 mt-2 remark">{{ item.remark }}</span>
                    </v-card>
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
          v-if="calculatePageLength > 1"
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
// Import vuex helpers
import { mapActions, mapGetters } from 'vuex';

// Import utils
import { dateFormat } from '@/utils/dateFormat';

export default {
  name: 'FlightRemarkAndHandover',

  data() {
    return {
      isPending: true,
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
      return this.isPending
        ? this.flights.filter(flight => !flight.isAcknowledged && flight.remark)
        : this.flights;
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

::v-deep .v-expansion-panel:not(:first-child)::after {
  border-top: none;
}

::v-deep .v-expansion-panel-content__wrap {
  padding: 0 1rem;
}

.v-expansion-panel--active:not(:first-child),
.v-expansion-panel--active + .v-expansion-panel {
  margin-top: 0;
}
.remark {
  white-space: pre-wrap;
}
</style>
