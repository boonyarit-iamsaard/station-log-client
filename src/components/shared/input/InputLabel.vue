<template>
  <span class="caption grey--text font-weight-medium">
    {{ label }}
  </span>
</template>

<script>
export default {
  name: 'InputLabel',

  props: {
    label: {
      type: String,
      default: 'Label',
    },
  },
};
</script>

<style scoped></style>
