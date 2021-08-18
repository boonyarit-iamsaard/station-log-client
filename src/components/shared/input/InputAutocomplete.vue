<template>
  <div>
    <input-label :label="label" />

    <v-autocomplete
      :clearable="clearable"
      :hint="hint"
      :items="items"
      :persistent-hint="!!hint"
      :rules="rules"
      @change="$emit('change')"
      clear-icon="mdi-close-circle-outline"
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
  name: 'InputAutocomplete',

  components: {
    'input-label': InputLabel,
  },

  props: {
    clearable: {
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

<style lang="scss" scoped>
::v-deep textarea {
  white-space: pre-wrap;
}
</style>
