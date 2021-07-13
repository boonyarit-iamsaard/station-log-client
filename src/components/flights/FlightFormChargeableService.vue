<template>
  <div>
    <confirm-dialog
      @action="
        $emit('removeFieldArray', { id: serviceID, name: 'chargeableServices' })
      "
      ref="confirmDialog"
      subtitle="This assigned delay will be deleted."
      title="Do you want to proceed?"
    />

    <v-row class="mb-0" v-if="model.length === 0">
      <flight-form-append-field-array-wrapper
        @appendFieldArray="$emit('appendFieldArray', 'chargeableServices')"
        title="Add Chargeable Service / Equipment"
      />
    </v-row>

    <v-card class="mb-4 shadow" v-if="model.length > 0">
      <v-card-title>
        <span class="black--text subtitle-1">
          Chargeable Services / Equipments
        </span>
      </v-card-title>

      <v-card-text>
        <v-row
          :key="service._id"
          class="my-0"
          v-for="(service, index) in model"
        >
          <v-col cols="12" sm="6">
            <input-autocomplete
              :items="chargeableItems"
              :rules="rules.service"
              label="Service / Equipment"
              v-model="service.service"
            />
          </v-col>

          <v-col
            cols="12"
            sm="2"
            v-if="chargeablePerHourItems.includes(service.service)"
          >
            <input-text
              :label="
                service.service === 'Brake Cooling'
                  ? 'Usage (fans)'
                  : 'Usage (hours)'
              "
              :rules="rules.usage"
              number
              v-model="service.usage"
            />
          </v-col>

          <v-col cols="12" sm="2">
            <input-text
              hint="Optional"
              label="Engineer (hours)"
              number
              v-if="chargeablePerServiceItems.includes(service.service)"
              v-model="service.engineerHours"
            />
          </v-col>

          <v-col cols="12" sm="2">
            <input-text
              hint="Optional"
              label="Mechanic (hours)"
              number
              v-if="chargeablePerServiceItems.includes(service.service)"
              v-model="service.mechanicHours"
            />
          </v-col>

          <v-col
            :class="index !== model.length - 1 ? 'pb-4' : null"
            class="pt-0"
            cols="12"
          >
            <v-btn
              @click="deleteChargeableService(service._id)"
              class="mr-4"
              color="error"
              outlined
            >
              Delete
            </v-btn>

            <v-btn
              :disabled="!service.service"
              @click="$emit('appendFieldArray', 'chargeableServices')"
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

import {
  chargeableItems,
  chargeablePerHourItems,
  chargeablePerServiceItems,
} from '@/components/flights/chargeable-items';

export default {
  name: 'FlightFormChargeableService',

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
        service: [],
        usage: [],
      }),
    },
    value: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      chargeableItems: chargeableItems(),
      chargeablePerHourItems: chargeablePerHourItems(),
      chargeablePerServiceItems: chargeablePerServiceItems(),
      serviceID: '',
    };
  },

  methods: {
    deleteChargeableService(id) {
      this.serviceID = id;
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

<style scoped></style>
