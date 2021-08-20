<template>
  <div>
    <p>Station Handover List</p>

    <StationHandoverListMobile v-if="mobile" />
    <StationHandoverListDesktop v-else />
  </div>
</template>

<script>
import StationHandoverListDesktop from '@/features/station-handover/components/StationHandoverListDesktop.vue';
import StationHandoverListMobile from '@/features/station-handover/components/StationHandoverListMobile.vue';

export default {
  components: { StationHandoverListDesktop, StationHandoverListMobile },

  name: 'StationHandoverList',

  computed: {
    mobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },
  },
};
</script>

<style lang="scss" scoped></style>
