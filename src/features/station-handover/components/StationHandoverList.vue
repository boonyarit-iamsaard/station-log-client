<template>
  <div>
    <StationHandoverListMobile
      v-if="mobile"
      :stationHandoverRecords="stationHandoverRecords"
    />
    <StationHandoverListDesktop
      v-else
      :stationHandoverRecords="stationHandoverRecords"
    />
  </div>
</template>

<script>
// Import vuex helpers
import { mapActions, mapGetters } from 'vuex';

// Import store types
import {
  fetchStationHandoverRecords,
  getStationHandoverRecords,
} from '@/store/modules/stationHandoverRecord/stationHandoverRecordTypes';

// Import components
import StationHandoverListDesktop from '@/features/station-handover/components/StationHandoverListDesktop.vue';
import StationHandoverListMobile from '@/features/station-handover/components/StationHandoverListMobile.vue';

export default {
  components: {
    StationHandoverListDesktop,
    StationHandoverListMobile,
  },

  name: 'StationHandoverList',

  methods: {
    ...mapActions({
      fetchStationHandoverRecords,
      setErrorMessage: 'error/setErrorMessage',
      setIsError: 'error/setIsError',
      setShouldLoading: 'setShouldLoading',
    }),

    async handleFetchStationHandoverRecords() {
      this.setShouldLoading(true);

      try {
        await this.fetchStationHandoverRecords().then(() => {
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
      stationHandoverRecords: getStationHandoverRecords,
    }),

    mobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },
  },

  created() {
    if (this.stationHandoverRecords.length === 0) {
      this.handleFetchStationHandoverRecords();
    }
  },
};
</script>

<style lang="scss" scoped></style>
