<template>
  <div>
    <confirm-dialog
      @action="
        $emit('removeFieldArray', { id: delayID, name: 'assignedDelays' })
      "
      ref="confirmDialog"
      subtitle="This assigned delay will be deleted."
      title="Do you want to proceed?"
    />

    <v-row class="mb-0" v-if="model.length === 0">
      <flight-form-append-field-array-wrapper
        @appendFieldArray="$emit('appendFieldArray', 'assignedDelays')"
        title="Add Assigned Delay"
      />
    </v-row>

    <v-card class="mb-4 shadow" v-if="model.length > 0">
      <v-card-title>
        <span class="black--text subtitle-1">Assigned Delays</span>
      </v-card-title>

      <v-card-text>
        <v-row :key="delay._id" class="my-0" v-for="(delay, index) in model">
          <v-col cols="12" sm="3">
            <input-autocomplete
              :items="codes"
              :rules="rules.code"
              @change="$emit('setDelayCategory', delay._id)"
              label="Code"
              v-model="delay.code"
            />
          </v-col>

          <v-col cols="12" sm="3">
            <input-text
              :rules="rules.category"
              disabled
              label="Category"
              v-model="delay.category"
            />
          </v-col>

          <v-col cols="12" sm="3">
            <input-text
              :rules="rules.duration"
              hint="HH:mm"
              label="Duration"
              time
              v-model="delay.duration"
            />
          </v-col>

          <v-col class="pt-0" cols="12">
            <v-btn
              @click="deleteAssignedDelay(delay._id)"
              class="mr-4"
              color="error"
              outlined
            >
              Delete
            </v-btn>

            <v-btn
              :disabled="!delay.code || !delay.category || !delay.duration"
              @click="$emit('appendFieldArray', 'assignedDelays')"
              color="primary"
              outlined
              v-if="index === model.length - 1"
            >
              Add more
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import ConfirmDialog from '@/components/shared/ConfirmDialog';
import FlightFormAppendFieldArrayWrapper from '@/components/flights/FlightFormAppendFieldArrayWrapper';
import InputAutocomplete from '@/components/shared/input/InputAutocomplete';
import InputText from '@/components/shared/input/InputText';

import assignableDelayCodes from '@/assets/static-data/assignable-delay-codes.json';

export default {
  name: 'FlightFormAssignedDelay',

  components: {
    'confirm-dialog': ConfirmDialog,
    'flight-form-append-field-array-wrapper': FlightFormAppendFieldArrayWrapper,
    'input-autocomplete': InputAutocomplete,
    'input-text': InputText,
  },

  props: {
    rules: {
      type: Object,
      default: () => ({
        code: [],
        category: [],
        duration: [],
      }),
    },
    value: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      companies: ['BFS', 'TG'],
      delayID: '',
      equipments: ['AIRCOND', 'ASU', 'Cherry Picker', 'GPU'],
    };
  },

  methods: {
    deleteAssignedDelay(id) {
      this.delayID = id;
      this.$refs.confirmDialog.dialog = true;
    },
  },

  computed: {
    codes() {
      let codes = [];

      assignableDelayCodes.forEach(delay => codes.push(delay.code));

      return codes.sort();
    },

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
