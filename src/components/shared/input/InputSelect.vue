<template>
  <div>
    <input-label :label="label" />

    <v-select
      :disabled="disabled"
      :hint="hint"
      :items="items"
      :persistent-hint="!!hint"
      :rules="rules"
      @change="$emit('change')"
      dense
      filled
      outlined
      v-model="model"
    />
  </div>
</template>

<script>
import InputLabel from '@/components/shared/input/InputLabel';

export default {
  name: 'InputSelect',

  components: {
    'input-label': InputLabel,
  },

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
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
