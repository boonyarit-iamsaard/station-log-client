<template>
  <div>
    <v-overlay :value="isLoading" absolute>
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <SparesListMobile :spares="spares" v-if="!isLoading && isMobile" />

    <SparesListDesktop :spares="spares" v-if="!isLoading && !isMobile" />
  </div>
</template>

<script>
import SparesListDesktop from '@/components/spares/SparesListDesktop';
import SparesListMobile from '@/components/spares/SparesListMobile';

export default {
  name: 'SparesList',

  components: { SparesListMobile, SparesListDesktop },

  methods: {
    async fetchSpares() {
      await this.$store.dispatch('setIsLoading');

      try {
        await this.$store.dispatch('spares/fetchSpares');
      } catch (error) {
        console.log(error.message || 'Something went wrong!');
      }

      await this.$store.dispatch('setIsLoading');
    },
  },

  computed: {
    spares() {
      return this.$store.getters['spares/getSpares'];
    },

    isLoading() {
      return this.$store.getters['getIsLoading'];
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
