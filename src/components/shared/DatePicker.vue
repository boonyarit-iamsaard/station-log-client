<template>
  <v-dialog
    ref="dialog"
    v-model="modal"
    :return-value.sync="selectedDate"
    persistent
    width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        :value="setDateFormatHandler(selectedDate)"
        append-icon="mdi-calendar"
        dense
        :disabled="disabled"
        label="Date"
        outlined
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker v-model="selectedDate" scrollable>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="modal = false"> Cancel </v-btn>
      <v-btn text color="primary" @click="$refs.dialog.save(selectedDate)">
        OK
      </v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script>
import { format } from 'date-fns';

export default {
  name: 'DatePicker',

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      modal: false,
      selectedDate: new Date().toISOString().substr(0, 10),
    };
  },

  methods: {
    setDateFormatHandler(date) {
      return format(new Date(date), 'dd MMMM yyyy');
    },
  },
};
</script>

<style scoped></style>
