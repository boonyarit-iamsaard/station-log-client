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
        <input-label label="Date" />

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

    <v-date-picker v-model="date" scrollable>
      <v-spacer />

      <v-btn text color="primary" @click="modal = false"> Cancel </v-btn>

      <v-btn text color="primary" @click="$refs.dialog.save(date)">
        Save
      </v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script>
import { format } from 'date-fns';

import InputLabel from '@/components/shared/input/InputLabel';

export default {
  name: 'InputDate',

  components: { InputLabel },

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: () => new Date().toISOString().substr(0, 10),
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
        this.$emit('input', new Date(date).toISOString().substr(0, 10));
      },
    },
  },

  filters: {
    dateFormat: date => {
      return format(new Date(date), 'dd MMMM yyyy');
    },
  },
};
</script>

<style scoped></style>
