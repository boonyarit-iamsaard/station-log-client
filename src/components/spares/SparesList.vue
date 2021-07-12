<template>
  <div>
    <SparesListMobile :spares="spares" v-if="!shouldLoading && isMobile" />

    <SparesListDesktop :spares="spares" v-if="!shouldLoading && !isMobile" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import SparesListDesktop from '@/components/spares/SparesListDesktop';
import SparesListMobile from '@/components/spares/SparesListMobile';

export default {
  name: 'SparesList',

  components: { SparesListMobile, SparesListDesktop },

  methods: {
    ...mapActions({
      fetchSpares: 'spares/fetchSpares',
      setIsError: 'error/setIsError',
      setErrorMessage: 'error/setErrorMessage',
      setShouldLoading: 'setShouldLoading',
    }),

    async handleFetchSpares() {
      this.setShouldLoading(true);

      try {
        const spares = await this.fetchSpares();

        if (!spares) {
          this.setShouldLoading(false);
          return;
        }

        this.setShouldLoading(false);
      } catch (error) {
        this.setShouldLoading(false);

        this.setIsError();
        this.setErrorMessage(error.message);
      }
    },
  },

  computed: {
    ...mapGetters({
      shouldLoading: 'getShouldLoading',
      spares: 'spares/getSpares',
    }),

    isMobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },
  },

  created() {
    if (this.spares.length === 0) {
      this.handleFetchSpares();
    }
  },
};
</script>

<style lang="scss" scoped></style>
