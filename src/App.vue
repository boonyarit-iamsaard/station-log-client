<template>
  <AppLayout>
    <router-view></router-view>
  </AppLayout>
</template>

<script>
import AppLayout from './components/layout/AppLayout';

export default {
  name: 'App',

  components: { AppLayout },

  methods: {
    async fetchInitialState() {
      this.$store.dispatch('setIsLoading');

      try {
        await this.$store.dispatch('spares/fetchSpares');

        await this.$store.dispatch('handling/fetchHandlingRecords');

        this.$store.dispatch('setIsLoading');
      } catch (err) {
        this.$store.dispatch('setIsLoading');

        this.$store.dispatch('error/setIsError');
        this.$store.dispatch('error/setErrorMessage', err.message);
      }
    },
  },

  created() {
    console.log('App created', new Date());

    this.fetchInitialState();
  },
};
</script>

<style lang="scss" scoped></style>
