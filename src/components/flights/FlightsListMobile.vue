<template>
  <div>
    <div class="mb-4">
      <span class="title">Flight Movement</span>
    </div>

    <v-data-iterator
      :items-per-page.sync="itemsPerPage"
      :items="flights"
      :page.sync="page"
      :sort-by="['date', 'createdAt']"
      :sort-desc="[true, true]"
      class="mb-14"
      hide-default-footer
      v-if="flights.length > 0"
    >
      <template v-slot:default="{ items }">
        <v-card
          :key="item._id"
          :to="{
            name: 'flight-edit',
            params: {
              id: item._id,
            },
          }"
          class="mb-4 shadow"
          link
          v-for="item in items"
        >
          <v-card-title class="d-flex align-center justify-space-between">
            <div>
              <airline-avatar-wrapper class="mr-4" :airline="item.airline" />

              <span class="subtitle-1 mr-4">
                {{ item.fltno }} / {{ item.acreg }}
              </span>
            </div>

            <span class="caption">{{ item.date | dateFormat }} </span>
          </v-card-title>

          <v-card-text class="pb-2">
            <v-row class="ma-0">
              <v-col class="pa-0" cols="6" sm="3">
                <span class="font-weight-bold">ATA: </span>

                <span>{{ item.ata !== '' ? item.ata : 'N/A' }}</span>
              </v-col>

              <v-col class="pa-0" cols="6" sm="3">
                <span class="font-weight-bold">ATD: </span>
                <span>{{ item.atd !== '' ? item.atd : 'N/A' }}</span>
              </v-col>

              <v-col class="pa-0" cols="6" sm="3">
                <span class="font-weight-bold">Bay: </span>

                <span>{{ item.bay }}</span>
              </v-col>

              <v-col class="pa-0" cols="6" sm="3">
                <span class="font-weight-bold">Check: </span>

                <span>
                  {{ check(item) }}
                </span>
              </v-col>
            </v-row>

            <v-row class="ma-0">
              <v-col class="pa-0" cols="6" sm="3">
                <span class="font-weight-bold">Engineer: </span>
                <span>{{ item.engineer }}</span>
              </v-col>

              <v-col class="pa-0" cols="6" sm="3">
                <span class="font-weight-bold">Mechanic-1: </span>
                <span>{{ item.mechanic1 }}</span>
              </v-col>
            </v-row>

            <v-row class="mx-0 mb-0 mt-2">
              <v-col class="pa-0">
                <v-chip
                  class="ml-0 my-2 mr-2"
                  color="error"
                  dark
                  small
                  v-if="item.assignedDelays.length > 0"
                >
                  <span class="caption"> Delayed </span>
                </v-chip>

                <v-chip
                  class="ml-0 my-2 mr-2"
                  small
                  v-if="item.extraGroundEquipments.length > 0"
                >
                  <span class="caption"> Extra Equipments </span>
                </v-chip>

                <v-chip
                  class="ml-0 my-2 mr-2"
                  small
                  v-if="item.tasks.length > 0"
                >
                  <span class="caption">Completed Tasks </span>
                </v-chip>

                <v-chip
                  class="ml-0 my-2 mr-2"
                  small
                  v-if="item.chargeableServices.length > 0"
                >
                  <span class="caption"> Chargeable Services </span>
                </v-chip>
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

    <v-card class="shadow" v-if="flights.length === 0">
      <v-card-text>
        <span> No flight record found. </span>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import AirlineAvatarWrapper from '@/components/shared/AirlineAvatarWrapper';

import { dateFormat } from '@/utils/dateFormat';

export default {
  name: 'FlightsListMobile',

  components: {
    'airline-avatar-wrapper': AirlineAvatarWrapper,
  },

  props: {
    flights: {
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
    check(item) {
      const { check1, check2, check3 } = item;

      if (!check1) return '';

      if (check1 && check2 && !check3) return `${check1} / ${check2}`;

      if (check1 && check2 && check3)
        return `${check1} / ${check2} / ${check3}`;

      return check1;
    },

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
      const calculatedLength = this.flights.length / defaultLength;

      return calculatedLength < 1 ? 1 : Math.ceil(calculatedLength);
    },
  },

  filters: {
    dateFormat,
  },
};
</script>

<style scoped></style>
