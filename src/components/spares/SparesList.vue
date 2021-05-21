<template>
  <div>
    <Progress :isLoading="isLoading" />

    <SparesListMobile :spares="spares" v-if="!isLoading && isMobile" />

    <SparesListDesktop :spares="spares" v-if="!isLoading && !isMobile" />
  </div>
</template>

<script>
import SparesListDesktop from '@/components/spares/SparesListDesktop';
import SparesListMobile from '@/components/spares/SparesListMobile';
import Progress from '../shared/Progress.vue';

export default {
  name: 'SparesList',

  data() {
    return {
      isLoading: false,
    };
  },

  components: { SparesListMobile, SparesListDesktop, Progress },

  methods: {
    async fetchSpares() {
      this.isLoading = true;

      try {
        await this.$store.dispatch('spares/fetchSpares');

        this.isLoading = false;
      } catch (err) {
        this.isLoading = false;

        this.$store.dispatch('error/setIsError');
        this.$store.dispatch('error/setErrorMessage', err.message);
      }
    },
  },

  computed: {
    spares() {
      return this.$store.getters['spares/getSpares'];
    },

    isMobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },
  },

  created() {
    this.fetchSpares();
  },
};
</script>

<style lang="scss" scoped></style>
