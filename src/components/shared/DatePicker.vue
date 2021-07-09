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
        :disabled="disabled"
        :value="formattedDate"
        append-icon="mdi-calendar"
        dense
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
      <v-btn text color="primary" @click="clickSaveDate"> SAVE </v-btn>
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
    providedDate: {
      type: String,
      default: () => new Date().toISOString().substr(0, 10),
    },
  },

  data() {
    return {
      modal: false,
      selectedDate: new Date().toISOString().substr(0, 10),
    };
  },

  methods: {
    clickSaveDate() {
      this.$refs.dialog.save(this.selectedDate);
      this.$emit('getSelectedDate', this.selectedDate);
      console.log(this.selectedDate);
    },
  },

  computed: {
    formattedDate() {
      return format(new Date(this.selectedDate), 'dd MMMM yyyy');
    },
  },

  created() {
    this.selectedDate = this.providedDate;
  },
};
</script>

<style scoped></style>
