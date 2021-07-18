<template>
  <v-dialog
    ref="dialog"
    v-model="modal"
    :return-value.sync="date"
    persistent
    width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <div>
        <input-label :label="label" />

        <v-text-field
          :disabled="disabled"
          :value="date | dateFormat"
          append-icon="mdi-calendar"
          dense
          filled
          outlined
          readonly
          v-bind="attrs"
          v-on="on"
        />
      </div>
    </template>

    <v-date-picker
      color="primary"
      v-model="date"
      scrollable
      show-adjacent-months
    >
      <v-spacer />

      <v-btn text color="primary" @click="modal = false"> Cancel </v-btn>

      <v-btn text color="primary" @click="$refs.dialog.save(date)">
        Save
      </v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script>
import InputLabel from '@/components/shared/input/InputLabel';

import { currentDate } from '@/utils/currentDate';
import { dateFormat } from '@/utils/dateFormat';

export default {
  name: 'InputDate',

  components: {
    'input-label': InputLabel,
  },

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: 'Date',
    },
    value: {
      type: String,
      default: currentDate(),
    },
  },

  data() {
    return {
      modal: false,
    };
  },

  computed: {
    date: {
      get() {
        return this.value;
      },

      set(date) {
        this.$emit('input', date);
      },
    },
  },

  filters: {
    dateFormat,
  },
};
</script>

<style scoped></style>
