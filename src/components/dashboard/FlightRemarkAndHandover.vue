<template>
  <div class="mt-8">
    <div class="mb-2">
      <span class="subtitle-1">Flight Remark / Handover</span>
    </div>

    <v-data-iterator
      :items-per-page.sync="itemsPerPage"
      :items="flightRemarkAndHandover"
      :page.sync="page"
      :sort-by="['date']"
      :sort-desc="[true]"
      class="mb-14"
      hide-default-footer
      v-if="flightRemarkAndHandover.length > 0"
    >
      <template v-slot:default="{ items }">
        <v-card
          :key="item._id"
          :to="{
            name: 'flight-edit',
            params: {
              id: item._id,
            },
          }"
          class="mb-4 shadow"
          link
          v-for="item in items"
        >
          <v-card-title class="d-flex align-center justify-space-between pb-2">
            <div>
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

            <div class="d-flex align-end flex-column">
              <span class="caption">{{ item.date | dateFormat }} </span>

              <span class="caption">{{ item.engineer }}</span>
            </div>
          </v-card-title>

          <v-card-text class="pb-2">
            <v-row class="ma-0">
              <v-col class="pa-0" cols="12">
                <span class="d-block font-weight-bold">Remark / Handover </span>
                <span>{{ item.remark }}</span>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
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
import { format } from 'date-fns';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'FlightRemarkAndHandover',

  props: {
    flights: {
      type: Array,
      default: () => [],
    },
  },

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
      getFlights: 'flight/getFlights',
    }),

    calculatePageLength() {
      const defaultLength = 5;
      const calculatedLength =
        this.flightRemarkAndHandover.length / defaultLength;

      return calculatedLength < 1 ? 1 : Math.floor(calculatedLength);
    },

    flightRemarkAndHandover() {
      return this.getFlights.filter(flight => flight.remark !== '');
    },
  },

  filters: {
    dateFormat(value) {
      if (!value) return '';

      return format(new Date(value), 'dd MMM yy');
    },
  },

  created() {
    if (this.getFlights.length === 0) {
      this.handleFetchFlights();
    }
  },
};
</script>

<style scoped></style>
