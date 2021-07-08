<template>
  <div>
    <flights-list-mobile
      :flights="flights"
      v-if="!shouldLoading && smallScreen"
    />

    <flights-list-desktop
      :flights="flights"
      v-if="!shouldLoading && !smallScreen"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import FlightsListMobile from '@/components/flights/FlightsListMobile';
import FlightsListDesktop from '@/components/flights/FlightsListDesktop';

export default {
  name: 'FlightsList',

  components: {
    'flights-list-desktop': FlightsListDesktop,
    'flights-list-mobile': FlightsListMobile,
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
  },

  computed: {
    ...mapGetters({
      flights: 'flight/getFlights',
      shouldLoading: 'getShouldLoading',
    }),

    smallScreen() {
      return this.$vuetify.breakpoint.smAndDown;
    },
  },

  created() {
    if (this.flights.length === 0) {
      this.handleFetchFlights();
    }
  },
};
</script>

<style scoped></style>
