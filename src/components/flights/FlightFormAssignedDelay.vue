<template>
  <div>
    <confirm-dialog
      @action="$emit('deleteAssignedDelay', delayID)"
      ref="confirmDialog"
      subtitle="This assigned delay will be deleted."
      title="Do you want to proceed?"
    />

    <v-row class="my-0">
      <v-col class="pt" cols="12" v-if="model.length > 0">
        <span class="black--text subtitle-1">Assigned Delay</span>
      </v-col>

      <v-col cols="12" v-if="model.length === 0">
        <v-btn
          @click="$emit('addAssignedDelay')"
          class="mb-4"
          color="info"
          outlined
        >
          Add Assigned Delay Codes
        </v-btn>
      </v-col>
    </v-row>

    <v-row :key="delay._id" class="my-0" v-for="(delay, index) in model">
      <v-col cols="12" sm="3">
        <input-select
          :items="codes"
          :rules="rules.code"
          label="Code"
          v-model="delay.code"
        />
      </v-col>

      <v-col cols="12" sm="3">
        <input-select
          :items="categories"
          :rules="rules.category"
          label="Category"
          v-model="delay.category"
        />
      </v-col>

      <v-col cols="12" sm="3">
        <input-text
          :rules="rules.duration"
          label="Duration"
          time
          v-model="delay.duration"
        />
      </v-col>

      <v-col class="pt-0 pb-4" cols="12">
        <v-btn
          @click="deleteAssignedDelay(delay._id)"
          class="mr-4"
          color="error"
          outlined
        >
          Delete
        </v-btn>

        <v-btn
          :disabled="
            delay.code === '' || delay.category === '' || delay.duration === ''
          "
          @click="$emit('addAssignedDelay')"
          color="primary"
          outlined
          v-if="index === model.length - 1"
        >
          Add more
        </v-btn>
      </v-col>
    </v-row>

    <v-divider class="mb-4" />
  </div>
</template>

<script>
import ConfirmDialog from '@/components/shared/ConfirmDialog';
import InputSelect from '@/components/shared/input/InputSelect';
import InputText from '@/components/shared/input/InputText';

import assignableDelay from '@/assets/static-data/assignable-delay.json';

export default {
  name: 'FlightFormAssignedDelay',

  components: {
    'confirm-dialog': ConfirmDialog,
    'input-select': InputSelect,
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
    categories() {
      let categories = [];

      assignableDelay.forEach(delay => categories.push(delay.category));

      return categories;
    },

    codes() {
      let codes = [];

      assignableDelay.forEach(delay => codes.push(delay.code));

      return codes;
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
