<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'SparesPage',

  computed: {
    isSparesFormPage() {
      return (
        this.$route.path === '/spares/create' ||
        this.$route.path === '/spares/edit'
      );
    },
  },
};
</script>
