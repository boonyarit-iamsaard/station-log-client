<template>
  <div>
    <Progress :isLoading="isLoading" />

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
import Progress from '../shared/Progress.vue';

export default {
  name: 'HandlingList',

  data() {
    return {
      isLoading: false,
    };
  },

  components: { HandlingListDesktop, HandlingListMobile, Progress },

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
