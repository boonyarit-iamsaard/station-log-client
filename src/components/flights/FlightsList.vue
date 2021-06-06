<template>
  <FlightsListMobile :flights="flights" v-if="!shouldLoading" />
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import FlightsListMobile from '@/components/flights/FlightsListMobile';

export default {
  name: 'FlightsList',

  components: { FlightsListMobile },

  methods: {
    ...mapActions({
      fetchFlights: 'flight/fetchFlights',
      setErrorMessage: 'error/setErrorMessage',
      setIsError: 'error/setIsError',
      setShouldLoading: 'setShouldLoading',
    }),

    async setFlightsList() {
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
  },

  created() {
    this.setFlightsList();
  },
};
</script>

<style scoped></style>
