<template>
  <div>
    <confirm-dialog
      @action="$emit('deleteTask', taskID)"
      ref="confirmDialog"
      subtitle="This task will be deleted."
      title="Do you want to proceed?"
    />

    <v-row class="my-0">
      <v-col class="pt-0" cols="12" v-if="model.length > 0">
        <span class="black--text subtitle-1">Completed Tasks</span>
      </v-col>

      <v-col cols="12" v-if="model.length === 0">
        <v-btn @click="$emit('addTask')" class="mb-4" color="info" outlined>
          Add Completed Task
        </v-btn>
      </v-col>
    </v-row>

    <v-row class="my-0" :key="task._id" v-for="(task, index) in model">
      <v-col cols="12" sm="3">
        <input-text
          hint="if applicable"
          label="WO/TASK"
          upper-case
          v-model="task.taskNo"
        />
      </v-col>

      <v-col cols="12" sm="3">
        <input-select
          :items="deferrals"
          hint="if applicable"
          label="ADD"
          v-model="task.deferral"
        />
      </v-col>

      <v-col cols="12" sm="3">
        <input-text
          hint="if applicable"
          label="ADD No."
          upper-case
          v-model="task.deferralNumber"
        />
      </v-col>

      <v-col cols="12" sm="3">
        <input-select
          :items="deferralActions"
          hint="if applicable"
          label="ADD action"
          v-model="task.deferralAction"
        />
      </v-col>

      <v-col cols="12" sm="3">
        <input-text
          label="Engineer (hours)"
          number
          v-model="task.engineerHours"
        />
      </v-col>

      <v-col cols="12" sm="3">
        <input-text
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

      <v-col class="pt-0 pb-4" cols="12">
        <v-btn
          @click="deleteTask(task._id)"
          class="mr-4"
          color="error"
          outlined
        >
          Delete
        </v-btn>

        <v-btn
          :disabled="task.taskDetails === ''"
          @click="$emit('addTask')"
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
import InputTextarea from '@/components/shared/input/InputTextarea';

export default {
  name: 'FlightFormChildComponent',

  components: {
    'confirm-dialog': ConfirmDialog,
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
