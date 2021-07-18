<template>
  <div>
    <div class="mb-4">
      <span class="title">Cabin Disinfection Record</span>
    </div>

    <v-data-iterator
      :items-per-page.sync="itemsPerPage"
      :items="disinfectionList"
      :page.sync="page"
      :sort-by="['date', 'createdAt']"
      :sort-desc="[true, true]"
      class="mb-14"
      hide-default-footer
      v-if="disinfectionList.length > 0"
    >
      <template v-slot:default="{ items }">
        <v-card
          :key="item._id"
          :to="{
            name: 'disinfection-edit',
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
              <airline-avatar-wrapper :airline="item.airline" />

              <span class="subtitle-1 mr-4">
                {{ item.fltno }} / {{ item.acreg }} / {{ item.aircraftType }}
              </span>
            </div>

            <span class="caption">{{ item.date | dateFormat }} </span>
          </v-card-title>

          <v-card-text class="pb-2">
            <v-row class="ma-0">
              <v-col class="pa-0" cols="6" sm="3">
                <span class="font-weight-bold">Start at: </span>
                <span>{{ item.startAt }}</span>
              </v-col>

              <v-col class="pa-0" cols="6" sm="3">
                <span class="font-weight-bold">End at: </span>
                <span>{{ item.endAt }}</span>
              </v-col>

              <v-col class="pa-0" cols="6" sm="3">
                <span class="font-weight-bold">Used: </span>
                <span>{{ item.chemicalUsage + ' liters.' }}</span>
              </v-col>
            </v-row>

            <v-row class="ma-0">
              <v-col class="pa-0" cols="6" sm="3">
                <span class="font-weight-bold">Mechanic-1: </span>
                <span>{{ item.mechanic1 }}</span>
              </v-col>

              <v-col class="pa-0" cols="6" sm="3">
                <span class="font-weight-bold">Mechanic-2: </span>
                <span>{{ item.mechanic2 }}</span>
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

    <v-card class="shadow" v-if="disinfectionList.length === 0">
      <v-card-text>
        <span> No cabin disinfection record found. </span>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import AirlineAvatarWrapper from '@/components/shared/AirlineAvatarWrapper';

import { dateFormat } from '@/utils/dateFormat';

export default {
  name: 'DisinfectionListMobile',

  components: {
    'airline-avatar-wrapper': AirlineAvatarWrapper,
  },

  props: {
    disinfectionList: {
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
      const calculatedLength = this.disinfectionList.length / defaultLength;

      return calculatedLength < 1 ? 1 : Math.ceil(calculatedLength);
    },
  },

  filters: {
    dateFormat,
  },

  created() {
    this.items = this.disinfectionList;
  },
};
</script>

<style scoped></style>
