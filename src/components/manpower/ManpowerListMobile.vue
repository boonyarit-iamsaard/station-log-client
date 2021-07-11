<template>
  <div>
    <div class="mb-4">
      <span class="title">Sick Leave / OT Record</span>
    </div>

    <v-data-iterator
      :items-per-page.sync="itemsPerPage"
      :items="manpowerRecords"
      :page.sync="page"
      :sort-by="['date', 'createdAt']"
      :sort-desc="[true, true]"
      class="mb-14"
      hide-default-footer
      v-if="manpowerRecords.length > 0"
    >
      <template v-slot:default="{ items }">
        <v-card
          :key="item._id"
          :to="{
            name: 'manpower-edit',
            params: {
              id: item._id,
            },
          }"
          class="mb-4 shadow"
          link
          v-for="item in items"
        >
          <v-card-title class="d-flex align-center justify-space-between">
            <span class="body-2 font-weight-bold">
              {{ item.date | dateFormat }}
            </span>

            <v-spacer />
          </v-card-title>

          <v-card-text class="pb-2">
            <v-row class="ma-0">
              <v-col class="pa-0" cols="6">
                <span class="font-weight-bold">Sick Leave</span>
              </v-col>

              <v-col class="pa-0" cols="3">
                <span>{{ item.sickLeaveDetails.name }}</span>
              </v-col>

              <v-col class="pa-0 text-right" cols="3">
                <span>{{ item.sickLeaveDetails.shift }}</span>
              </v-col>
            </v-row>

            <v-row class="ma-0">
              <v-col class="pa-0" cols="6">
                <span class="font-weight-bold">OT / Reschedule</span>
              </v-col>

              <v-col class="pa-0" cols="3">
                <span>{{ item.overTimeDetails.name }}</span>
              </v-col>

              <v-col class="pa-0 text-right" cols="3">
                <span>{{ item.overTimeDetails.shift }}</span>
              </v-col>
            </v-row>

            <v-row class="ma-0">
              <v-col class="pa-0" cols="6">
                <span class="font-weight-bold">OT Required By</span>
              </v-col>

              <v-col class="pa-0" cols="3" />

              <v-col class="pa-0 text-right" cols="3">
                <span>{{ item.overTimeDetails.requiredBy }}</span>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </template>

      <template v-slot:footer>
        <v-pagination
          :length="calculatePageLength"
          :total-visible="5"
          circle
          v-model="page"
        />
      </template>
    </v-data-iterator>

    <v-card class="shadow" v-if="manpowerRecords.length === 0">
      <v-card-text>
        <span> No cabin disinfection record found. </span>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { format } from 'date-fns';

export default {
  name: 'manpowerRecordsMobile',

  props: {
    manpowerRecords: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      itemsPerPage: 5,
      itemsPerPageArray: [5, 10, 20],
      page: 1,
    };
  },

  methods: {
    setAvatarColor(airline) {
      switch (airline) {
        case 'CX':
          return 'primary';
        case 'LD':
          return 'error';
        case 'PR':
          return 'secondary';
        default:
          return 'info';
      }
    },
  },

  computed: {
    calculatePageLength() {
      const defaultLength = 5;
      const calculatedLength = this.manpowerRecords.length / defaultLength;

      return calculatedLength < 1 ? 1 : Math.floor(calculatedLength);
    },
  },

  filters: {
    dateFormat(value) {
      if (!value) return '';

      return format(new Date(value), 'dd MMM yy');
    },
  },

  created() {
    this.items = this.manpowerRecords;
  },
};
</script>

<style scoped></style>
