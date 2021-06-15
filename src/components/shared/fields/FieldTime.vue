<template>
  <v-form ref="form">
    <v-text-field
      :label="fields.label"
      :rules="fields.rules"
      append-icon="mdi-clock-outline"
      dense
      hint="HH:mm"
      outlined
      persistent-hint
      v-mask="'##:##'"
      v-model="model"
    ></v-text-field>
  </v-form>
</template>

<script>
import { VueMaskDirective } from 'v-mask';

export default {
  name: 'FieldTime',

  props: ['fields', 'value'],

  directives: {
    mask: VueMaskDirective,
  },

  methods: {
    validateField() {
      this.$refs.form.$nextTick(() => {
        this.$refs.form.validate();
      });
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
