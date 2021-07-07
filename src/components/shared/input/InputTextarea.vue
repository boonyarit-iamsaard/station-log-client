<template>
  <div>
    <input-label :label="label" />

    <v-textarea
      :hint="hint"
      :persistent-hint="hint !== ''"
      :rows="3"
      :rules="rules"
      class="uppercase"
      dense
      filled
      outlined
      ref="textarea"
      v-model="model"
    />
  </div>
</template>

<script>
import InputLabel from '@/components/shared/input/InputLabel';
export default {
  name: 'InputTextarea',
  components: { InputLabel },
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
        const text = this.$refs.textarea.$refs.input;
        const start = text.selectionStart;

        this.$emit('input', value.toUpperCase());

        this.$nextTick(() => {
          text.selectionStart = text.selectionEnd = start;
        });
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
