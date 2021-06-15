<template>
  <v-form ref="form">
    <v-dialog
      :return-value.sync="date"
      persistent
      ref="dialog"
      v-model="modal"
      width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          :disabled="fields.disabled"
          :label="fields.label"
          :value="date | date"
          append-icon="mdi-calendar"
          autofocus
          dense
          outlined
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>

      <v-date-picker v-model="date" scrollable>
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="modal = false"> Cancel </v-btn>
        <v-btn text color="primary" @click="$refs.dialog.save(date)">
          SAVE
        </v-btn>
      </v-date-picker>
    </v-dialog>
  </v-form>
</template>

<script>
import { format } from 'date-fns';

export default {
  name: 'FieldDeat',

  props: ['fields', 'value'],

  data() {
    return {
      modal: false,
    };
  },

  methods: {
    validateField() {
      this.$refs.form.$nextTick(() => {
        this.$refs.form.validate();
      });
    },
  },

  computed: {
    date: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },

  filters: {
    date(value) {
      return format(new Date(value), 'dd MMMM yyyy');
    },
  },
};
</script>

<style lang="scss" scoped></style>
