<template>
  <v-combobox
    :class="upperCase ? 'uppercase' : null"
    :hint="hint"
    :items="items"
    :label="label"
    :menu-props="{
      maxHeight: '100%',
    }"
    :persistent-hint="hint !== ''"
    @change="$emit('change')"
    dense
    outlined
    v-model="model"
  />
</template>

<script>
export default {
  name: 'InputCombo',

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
    value: {
      type: String,
      default: '',
    },
    upperCase: {
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
        this.$emit('input', this.upperCase ? value.toUpperCase() : value);
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
