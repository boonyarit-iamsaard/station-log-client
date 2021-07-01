<template>
  <div>
    <confirm-dialog
      @action="$emit('deleteExtraGroundEquipment', equipmentID)"
      ref="confirmDialog"
      subtitle="This extra equipment will be deleted."
      title="Do you want to proceed?"
    />

    <v-row
      :key="equipment._id"
      class="my-0"
      v-for="(equipment, index) in model"
    >
      <v-col cols="12" sm="3">
        <input-select
          :items="equipments"
          :rules="rules.equipment"
          label="Equipment"
          v-model="equipment.equipment"
        />
      </v-col>

      <v-col cols="12" sm="3">
        <input-select
          :items="companies"
          :rules="rules.company"
          label="Company"
          v-model="equipment.company"
        />
      </v-col>

      <v-col cols="12" sm="6">
        <v-btn
          @click="deleteExtraGroundEquipment(equipment._id)"
          class="mr-4"
          color="error"
          outlined
        >
          Delete
        </v-btn>

        <v-btn
          :disabled="equipment.equipment === '' || equipment.company === ''"
          @click="$emit('addExtraGroundEquipment')"
          color="primary"
          outlined
          v-if="index === model.length - 1"
        >
          Add more
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ConfirmDialog from '@/components/shared/ConfirmDialog';
import InputSelect from '@/components/shared/input/InputSelect';

export default {
  name: 'FlightFormExtraGroundEquipment',

  components: {
    'confirm-dialog': ConfirmDialog,
    'input-select': InputSelect,
  },

  props: {
    rules: {
      type: Object,
      default: () => ({
        company: [],
        equipment: [],
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
      equipmentID: '',
      equipments: ['AIRCOND', 'ASU', 'Cherry Picker', 'GPU'],
    };
  },

  methods: {
    deleteExtraGroundEquipment(id) {
      this.equipmentID = id;
      this.$refs.confirmDialog.dialog = true;
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
