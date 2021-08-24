<template>
  <div>
    <AogHandover v-if="mobile" />

    <AogHandoverListDesktop v-else :aogHandoverRecords="aogHandoverRecords" />
  </div>
</template>

<script>
// Import vuex helpers
import { mapActions, mapGetters } from 'vuex';

// Import store types
import {
  fetchAogHandoverRecords,
  getAogHandoverRecords,
} from '@/store/modules/aogHandoverRecord/aogHandoverRecordTypes';

// Import components
import AogHandover from '@/components/dashboard/AogHandover.vue';
import AogHandoverListDesktop from '@/features/aogHandover/components/AogHandoverListDesktop.vue';

export default {
  components: {
    AogHandover,
    AogHandoverListDesktop,
  },

  name: 'AogHandoverList',

  methods: {
    ...mapActions('aogHandoverRecord', {
      fetchAogHandoverRecords,
    }),

    ...mapActions({
      setErrorMessage: 'error/setErrorMessage',
      setIsError: 'error/setIsError',
      setShouldLoading: 'setShouldLoading',
    }),

    async setAogHandoverRecords() {
      this.setShouldLoading(true);

      try {
        await this.fetchAogHandoverRecords().then(() => {
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
    ...mapGetters('aogHandoverRecord', {
      aogHandoverRecords: getAogHandoverRecords,
    }),

    mobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },
  },

  created() {
    if (this.aogHandoverRecords.length === 0) {
      this.setAogHandoverRecords();
    }
  },
};
</script>

<style lang="scss" scoped></style>
