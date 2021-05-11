<template>
  <div>
    <v-overlay :value="isLoading" absolute>
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <HandlingListMobile
      :handlingRecords="handlingRecords"
      v-if="!isLoading && isMobile"
    />

    <HandlingListDesktop
      :handlingRecords="handlingRecords"
      v-if="!isLoading && !isMobile"
    />
  </div>
</template>

<script>
import HandlingListDesktop from '@/components/handling/HandlingListDesktop';
import HandlingListMobile from '@/components/handling/HandlingListMobile.vue';

export default {
  name: 'HandlingList',

  data() {
    return {
      isLoading: false,
    };
  },

  components: { HandlingListDesktop, HandlingListMobile },

  methods: {
    async fetchHandlingRecordsHandler() {
      this.isLoading = true;

      try {
        await this.$store.dispatch('handling/fetchHandlingRecords');
      } catch (error) {
        console.log(error.message || 'Something went wrong!');
      }

      this.isLoading = false;
    },
  },

  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },

    handlingRecords() {
      return this.$store.getters['handling/getHandlingRecords'];
    },
  },

  created() {
    this.fetchHandlingRecordsHandler();
  },
};
</script>

<style scoped></style>
