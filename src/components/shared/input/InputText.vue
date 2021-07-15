<template>
  <div>
    <input-label :label="label" />

    <v-text-field
      :class="upperCase ? 'uppercase' : null"
      :clearable="clearable"
      :counter="counter"
      :disabled="disabled"
      :hint="hint"
      :persistent-hint="hint !== ''"
      :prefix="prefix"
      :prepend-inner-icon="prependInnerIcon"
      :rules="rules"
      :type="inputType"
      clear-icon="mdi-close-circle-outline"
      dense
      filled
      outlined
      ref="text"
      v-mask="time ? '##:##' : null"
      v-model="model"
    />
  </div>
</template>

<script>
import { VueMaskDirective } from 'v-mask';

import InputLabel from '@/components/shared/input/InputLabel';

export default {
  name: 'InputText',

  components: {
    'input-label': InputLabel,
  },

  props: {
    clearable: {
      type: Boolean,
      default: false,
    },
    counter: {
      type: Number,
      default: undefined,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
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
    prependInnerIcon: {
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
    type: {
      type: String,
      default: 'text',
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
    inputType() {
      if (this.number) return 'number';

      return this.type;
    },

    model: {
      get() {
        return this.value;
      },

      set(value) {
        if (!this.number) {
          const text = this.$refs.text.$refs.input;
          const start = text.selectionStart;

          this.upperCase ? (value = value.toUpperCase()) : value;

          this.$emit('input', value);

          this.$nextTick(() => {
            text.selectionStart = text.selectionEnd = start;
          });
        } else this.$emit('input', Number(value));
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
