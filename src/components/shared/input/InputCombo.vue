<template>
  <div>
    <input-label :label="label" />

    <v-combobox
      :class="!!upperCase && 'uppercase'"
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
  name: 'InputCombo',

  components: {
    'input-label': InputLabel,
  },

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
