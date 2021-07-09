<template>
  <div>
    <disinfection-list-mobile
      :disinfection-list="disinfectionList"
      v-if="smallScreen && !shouldLoading"
    />

    <disinfection-list-desktop
      :disinfection-list="disinfectionList"
      v-if="!smallScreen && !shouldLoading"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import DisinfectionListMobile from '@/components/disinfection/DisinfectionListMobile';
import DisinfectionListDesktop from '@/components/disinfection/DisinfectionListDesktop';

export default {
  name: 'DisinfectionList',

  components: {
    'disinfection-list-mobile': DisinfectionListMobile,
    'disinfection-list-desktop': DisinfectionListDesktop,
  },

  methods: {
    ...mapActions({
      fetchDisinfectionList: 'disinfection/fetchDisinfectionList',
      setShouldLoading: 'setShouldLoading',
      setIsError: 'error/setIsError',
      setErrorMessage: 'error/setErrorMessage',
    }),

    async handleFetchDisinfectionList() {
      this.setShouldLoading(true);

      try {
        await this.fetchDisinfectionList().then(() => {
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
      disinfectionList: 'disinfection/getDisinfectionList',
      shouldLoading: 'getShouldLoading',
    }),

    smallScreen() {
      return this.$vuetify.breakpoint.smAndDown;
    },
  },

  created() {
    if (this.disinfectionList.length === 0) {
      this.handleFetchDisinfectionList();
    }
  },
};
</script>

<style scoped></style>
