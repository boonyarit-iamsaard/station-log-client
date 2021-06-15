<template>
  <v-form ref="form">
    <v-text-field
      :label="fields.label"
      :prefix="fields.prefix"
      :rules="fields.rules"
      v-model="model"
      dense
      outlined
    ></v-text-field>
  </v-form>
</template>

<script>
export default {
  name: 'FieldText',

  props: ['fields', 'value'],

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
        value = value.toUpperCase();
        this.$emit('input', value);
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
