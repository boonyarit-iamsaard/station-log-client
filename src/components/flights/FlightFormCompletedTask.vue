<template>
  <div>
    <confirm-dialog
      @action="
        $emit('removeFieldArray', {
          id: taskID,
          name: 'tasks',
        })
      "
      ref="confirmDialog"
      subtitle="This task will be deleted."
      title="Do you want to proceed?"
    />

    <v-row class="mb-0" v-if="model.length === 0">
      <flight-form-append-field-array-wrapper
        @appendFieldArray="$emit('appendFieldArray', 'tasks')"
        title="Add Completed Task"
      />
    </v-row>

    <v-card v-if="model.length > 0" class="mb-4 shadow">
      <v-card-title>
        <span class="black--text subtitle-1">Completed Tasks</span>
      </v-card-title>

      <v-card-text>
        <v-row :key="task._id" class="my-0" v-for="(task, index) in model">
          <v-col cols="12" sm="3">
            <input-text
              hint="Optional"
              label="WO/TASK"
              upper-case
              v-model="task.taskNo"
            />
          </v-col>

          <v-col cols="12" sm="3">
            <input-select
              :items="deferrals"
              hint="Optional"
              label="ADD"
              v-model="task.deferral"
            />
          </v-col>

          <v-col cols="12" sm="3">
            <input-text
              hint="Optional"
              label="ADD No."
              upper-case
              v-model="task.deferralNumber"
            />
          </v-col>

          <v-col cols="12" sm="3">
            <input-select
              :items="deferralActions"
              hint="Optional"
              label="ADD action"
              v-model="task.deferralAction"
            />
          </v-col>

          <v-col cols="12" sm="3">
            <input-text
              hint="Optional"
              label="Engineer (hours)"
              number
              v-model="task.engineerHours"
            />
          </v-col>

          <v-col cols="12" sm="3">
            <input-text
              hint="Optional"
              label="Mechanic (hours)"
              number
              v-model="task.mechanicHours"
            />
          </v-col>

          <v-col class="pb-0" cols="12">
            <input-textarea
              :rules="rules.taskDetails"
              label="Details"
              v-model="task.taskDetails"
            />
          </v-col>

          <v-col class="pt-0" cols="12">
            <v-btn
              @click="deleteTask(task._id)"
              class="mr-4"
              color="error"
              outlined
            >
              Delete
            </v-btn>

            <v-btn
              :disabled="!task.taskDetails"
              @click="$emit('appendFieldArray', 'tasks')"
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
import InputText from '@/components/shared/input/InputText';
import InputTextarea from '@/components/shared/input/InputTextarea';

export default {
  name: 'FlightFormChildComponent',

  components: {
    'confirm-dialog': ConfirmDialog,
    'flight-form-append-field-array-wrapper': FlightFormAppendFieldArrayWrapper,
    'input-select': InputSelect,
    'input-text': InputText,
    'input-textarea': InputTextarea,
  },

  props: {
    rules: {
      type: Object,
      default: () => ({
        taskDetails: [],
      }),
    },
    value: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      deferralActions: ['Cleared', 'Worked'],
      deferrals: ['PADD', 'SADD', 'ADD', 'ZADD', 'CADD', 'MADD'],
      taskID: '',
    };
  },

  methods: {
    deleteTask(id) {
      this.taskID = id;
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
