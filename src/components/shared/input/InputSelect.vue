<template>
  <v-select
    :hint="hint"
    :items="items"
    :label="label"
    :menu-props="{
      maxHeight: '100%',
    }"
    :persistent-hint="hint !== ''"
    :rules="rules"
    dense
    outlined
    v-model="model"
  />
</template>

<script>
export default {
  name: 'InputSelect',

  props: {
    hint: {
      type: String,
      default: '',
    },
    items: {
      type: Array,
      default: () => [],
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
      type: String,
      default: '',
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

<style lang="scss" scoped></style>
