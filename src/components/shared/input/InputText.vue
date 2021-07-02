<template>
  <v-text-field
    :class="upperCase ? 'uppercase' : null"
    :hint="hint"
    :label="label"
    :prefix="prefix"
    :persistent-hint="hint !== ''"
    :rules="rules"
    :type="number ? 'number' : 'text'"
    dense
    outlined
    ref="text"
    v-mask="time ? '##:##' : null"
    v-model="model"
  />
</template>

<script>
import { VueMaskDirective } from 'v-mask';

export default {
  name: 'InputText',

  props: {
    hint: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: 'Label',
    },
    number: {
      type: Boolean,
      default: false,
    },
    prefix: {
      type: String,
      default: '',
    },
    rules: {
      type: Array,
      default: () => [],
    },
    time: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [String, Number],
      default: '',
    },
    upperCase: {
      type: Boolean,
      default: false,
    },
  },

  directives: {
    mask: VueMaskDirective,
  },

  computed: {
    model: {
      get() {
        return this.value;
      },

      set(value) {
        const text = this.$refs.text.$refs.input;
        const start = text.selectionStart;

        this.number ? (value = Number(value)) : value;
        this.upperCase ? (value = value.toUpperCase()) : value;

        this.$emit('input', value);

        this.$nextTick(() => {
          text.selectionStart = text.selectionEnd = start;
        });
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
