<template>
  <v-textarea
    :hint="hint"
    :label="label"
    :persistent-hint="hint !== ''"
    :rows="3"
    :rules="rules"
    class="uppercase"
    dense
    outlined
    v-model="model"
  />
</template>

<script>
export default {
  name: 'InputTextarea',

  props: {
    hint: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: 'Label',
    },
    rules: {
      type: Array,
      default: () => [],
    },
    value: {
      type: [String, Number],
      default: '',
    },
  },

  computed: {
    model: {
      get() {
        return this.value;
      },

      set(value) {
        this.$emit('input', value.toUpperCase());
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
