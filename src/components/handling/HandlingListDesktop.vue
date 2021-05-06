<template>
  <v-data-table
    class="mx-auto"
    style="max-width: 959px"
    :headers="headers"
    :items="handlingRecords"
    :sort-by="['date']"
    :sort-desc="[true]"
  >
    <template v-slot:top v-if="$vuetify.breakpoint.mdAndUp">
      <div class="d-flex justify-end pa-4">
        <v-btn depressed link color="primary" to="/handling/create">
          <v-icon left>mdi-plus</v-icon>
          ADD
        </v-btn>
      </div>
    </template>

    <template v-slot:item.date="{ item }">
      {{ setDateFormatHandler(item.date) }}
    </template>

    <template v-slot:item.airline="{ item }">
      <span v-if="item.airline === 'Other'">
        {{ item.otherAirline }}
      </span>
      <span v-else>
        {{ item.airline }}
      </span>
    </template>

    <template v-slot:item.check="{ item }">
      <span v-if="item.check === 'Other'">
        {{ item.otherCheck }}
      </span>
      <span v-else>
        {{ item.check }}
      </span>
    </template>

    <template v-slot:item.tasks="{ item }">
      <v-dialog v-model="dialog" max-width="959">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
            @click="setTaskDetailsDialogHandler(item)"
          >
            <v-icon>mdi-open-in-new</v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-card-title class="pa-4">Tasks</v-card-title>
          <v-card-text class="pa-4">
            <v-data-table
              :items="taskDetails"
              :items-per-page="5"
              :headers="taskHeaders"
            ></v-data-table>
          </v-card-text>
        </v-card>
      </v-dialog>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-btn class="mr-2" icon link :to="`/handling/edit/${item._id}`">
        <v-icon> mdi-pencil </v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { format } from 'date-fns';

export default {
  name: 'HandlingListDesktop',

  props: {
    handlingRecords: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      dialog: false,
      headers: [
        { text: 'Date', value: 'date' },
        { text: 'Airline', value: 'airline' },
        { text: 'Flt No.', value: 'fltno' },
        { text: 'A/C Type', value: 'aircraftType' },
        { text: 'Check', value: 'check' },
        { text: 'Tasks', value: 'tasks' },
        { text: 'EIC', value: 'eic' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      taskHeaders: [
        { text: 'WO/TASK', value: 'taskNo' },
        { text: 'Details', value: 'taskDetails' },
        { text: 'ENG (Hr.)', value: 'hour.eng' },
        { text: 'MECH (Hr.)', value: 'hour.mech' },
      ],
      taskDetails: [],
    };
  },

  methods: {
    setDateFormatHandler(date) {
      return format(new Date(date), 'dd MMM yy');
    },

    setTaskDetailsDialogHandler(item) {
      this.taskDetails = item.tasks.map(task => {
        return { ...task, taskNo: !task.taskNo ? 'N/A' : task.taskNo };
      });

      this.dialog = true;
    },
  },
};
</script>

<style scoped></style>
