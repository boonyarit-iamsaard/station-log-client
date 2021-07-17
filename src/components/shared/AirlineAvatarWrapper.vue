<template>
  <v-avatar :class="color" size="32">
    {{ airline }}
  </v-avatar>
</template>

<script>
export default {
  name: 'AirlineAvatarWrapper',

  props: {
    airline: {
      type: String,
      default: 'CX',
    },
  },

  computed: {
    color() {
      switch (this.airline) {
        case 'CX':
          return 'primary caption white--text';
        case 'LD':
          return 'secondary caption';
        case 'PR':
          return 'error caption white--text';
        default:
          return 'grey caption lighten-3';
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
