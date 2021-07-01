<template>
  <v-checkbox :label="label" :rules="rules" class="mt-0" v-model="model" />
</template>

<script>
export default {
  name: 'InputCheckbox',

  props: {
    label: {
      type: String,
      default: 'Label',
    },
    rules: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    model: {
      get() {
        return this.value;
      },

      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
</script>

<style scoped></style>
