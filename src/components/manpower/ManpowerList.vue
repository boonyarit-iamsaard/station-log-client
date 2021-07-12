<template>
  <div>
    <manpower-list-mobile
      :manpowerRecords="manpowerRecords"
      v-if="!shouldLoading && smallScreen"
    />

    <manpower-list-desktop
      :manpowerRecords="manpowerRecords"
      v-if="!shouldLoading && !smallScreen"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import ManpowerListMobileVue from '@/components/manpower/ManpowerListMobile.vue';
import ManpowerListDesktop from '@/components/manpower/ManpowerListDesktop';

export default {
  name: 'ManpowerList',

  components: {
    'manpower-list-desktop': ManpowerListDesktop,
    'manpower-list-mobile': ManpowerListMobileVue,
  },

  methods: {
    ...mapActions({
      fetchManpowerRecords: 'manpower/fetchManpowerRecords',
      setShouldLoading: 'setShouldLoading',
      setIsError: 'error/setIsError',
      setErrorMessage: 'error/setErrorMessage',
    }),

    async handleFetchManpowerRecords() {
      this.setShouldLoading(true);

      try {
        await this.fetchManpowerRecords().then(() => {
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
      manpowerRecords: 'manpower/getManpowerRecords',
      shouldLoading: 'getShouldLoading',
    }),

    smallScreen() {
      return this.$vuetify.breakpoint.smAndDown;
    },
  },

  created() {
    if (this.manpowerRecords.length === 0) {
      this.handleFetchManpowerRecords();
    }
  },
};
</script>

<style lang="scss" scoped></style>
