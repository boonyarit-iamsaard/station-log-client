<template>
  <div>
    <confirm-dialog
      @action="
        $emit('removeFieldArray', {
          id: handoverDetailsID,
          name: 'details',
        })
      "
      ref="confirmDialog"
      subtitle="This handover details record will be deleted."
      title="Do you want to proceed?"
    />

    <v-row class="mb-0" v-if="model.length === 0">
      <FlightFormAppendFieldArrayWrapper
        @appendFieldArray="$emit('appendFieldArray', 'details')"
        title="Add Handover Details"
      />
    </v-row>

    <v-card class="mb-4 shadow" v-if="model.length > 0">
      <v-card-title>
        <span class="black--text subtitle-1">Handover Details</span>
      </v-card-title>

      <v-card-text>
        <v-row :key="detail._id" class="my-0" v-for="(detail, index) in model">
          <v-col
            :cols="item.xs"
            :key="item.name"
            :sm="item.sm"
            v-for="item in aogHandoverFormHandoverDetailsFields"
          >
            <component
              :clearable="item.clearable"
              :is="item.type"
              :hint="item.hint"
              :items="item.items"
              :label="item.label"
              :rules="rules[item.name]"
              :upper-case="item.upperCase"
              @change="onChange(item.name, index)"
              v-if="shouldShow(item.name, index)"
              v-model="detail[item.name]"
            />
          </v-col>
          <v-col
            :class="index !== model.length - 1 ? 'pb-4' : null"
            class="pt-0"
            cols="12"
          >
            <v-btn
              @click="deleteHandoverDetails(detail._id)"
              class="mr-4"
              color="error"
              outlined
            >
              Delete
            </v-btn>

            <v-btn
              :disabled="!detail.recordBy || !detail.details"
              @click="$emit('appendFieldArray', 'details')"
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
// Import components
import ConfirmDialog from '@/components/shared/ConfirmDialog.vue';
import FlightFormAppendFieldArrayWrapper from '@/components/flights/FlightFormAppendFieldArrayWrapper.vue';
import InputAutocomplete from '@/components/shared/input/InputAutocomplete.vue';
import InputCheckbox from '@/components/shared/input/InputCheckbox.vue';
import InputDate from '@/components/shared/input/InputDate.vue';
import InputTextarea from '@/components/shared/input/InputTextarea.vue';

// Import helpers
import { aogHandoverFormHandoverDetailsFields } from '@/features/aogHandover/helpers/aogHandoverFormFields';

// Import utils
import { currentDate } from '@/utils/currentDate';

export default {
  name: 'AogHandoverFormHandoverDetails',

  components: {
    ConfirmDialog,
    FlightFormAppendFieldArrayWrapper,
    InputAutocomplete,
    InputCheckbox,
    InputDate,
    InputTextarea,
  },

  props: {
    rules: {
      type: Object,
      default: () => ({
        recordBy: [],
        details: [],
        acknowledgedBy: [],
      }),
    },
    value: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      aogHandoverFormHandoverDetailsFields: [
        ...aogHandoverFormHandoverDetailsFields,
      ],
      handoverDetailsID: '',
    };
  },

  methods: {
    currentDate,

    deleteHandoverDetails(id) {
      this.handoverDetailsID = id;
      this.$refs.confirmDialog.dialog = true;
    },

    /**
     * Reset acknowledgedBy and acknowledgedDate values
     */
    onAcknowledgedChange(index) {
      this.model[index].acknowledgedBy = '';

      this.model[index].isAcknowledged
        ? (this.model[index].acknowledgedDate = this.currentDate())
        : (this.model[index].acknowledgedDate = '');
    },

    /**
     * Check field name and invoke related function
     */
    onChange(name, index) {
      if (name === 'isAcknowledged') {
        this.onAcknowledgedChange(index);
      }
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

    shouldShow() {
      return function (name, index) {
        if (name === 'acknowledgedBy' && !this.model[index].isAcknowledged)
          return false;

        return !(
          name === 'acknowledgedDate' && !this.model[index].isAcknowledged
        );
      };
    },
  },
};
</script>

<style lang="scss" scoped></style>
