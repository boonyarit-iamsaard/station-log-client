<template>
  <div>
    <confirm-dialog
      @action="
        $emit('removeFieldArray', {
          id: equipmentID,
          name: 'extraGroundEquipments',
        })
      "
      ref="confirmDialog"
      subtitle="This extra equipment will be deleted."
      title="Do you want to proceed?"
    />

    <v-row class="mb-0" v-if="model.length === 0">
      <flight-form-append-field-array-wrapper
        @appendFieldArray="$emit('appendFieldArray', 'extraGroundEquipments')"
        title="Add Extra Ground Equipment"
      />
    </v-row>

    <v-card v-if="model.length > 0" class="mb-4 shadow">
      <v-card-title>
        <span class="black--text subtitle-1">Extra Ground Equipments</span>
      </v-card-title>

      <v-card-text>
        <v-row :key="equipment._id" v-for="(equipment, index) in model">
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

          <v-col cols="12" sm="6" style="padding-top: 22px">
            <v-btn
              @click="deleteExtraGroundEquipment(equipment._id)"
              class="mr-4"
              color="error"
              outlined
            >
              Delete
            </v-btn>

            <v-btn
              :disabled="!equipment.equipment || !equipment.company"
              @click="$emit('appendFieldArray', 'extraGroundEquipments')"
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
import InputSelect from '@/components/shared/input/InputSelect';

export default {
  name: 'FlightFormExtraGroundEquipment',

  components: {
    'confirm-dialog': ConfirmDialog,
    'flight-form-append-field-array-wrapper': FlightFormAppendFieldArrayWrapper,
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
