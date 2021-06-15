<template>
  <v-form ref="form">
    <v-select
      :items="fields.items"
      :label="fields.label"
      :menu-props="{ maxHeight: '100vh' }"
      :rules="fields.rules"
      v-model="model"
      dense
      outlined
    ></v-select>
  </v-form>
</template>

<script>
export default {
  name: 'FieldSelect',

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
        this.$emit('input', value);
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
