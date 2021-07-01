<template>
  <div>
    <v-data-iterator
      :items-per-page.sync="itemsPerPage"
      :items="items"
      :page.sync="page"
      :sort-by="['date']"
      :sort-desc="[true]"
      class="mb-14"
      hide-default-footer
      v-if="items.length > 0"
    >
      <template v-slot:default="{ items }">
        <v-card
          :key="item._id"
          :to="{
            name: 'flightEdit',
            params: {
              id: item._id,
            },
          }"
          class="mb-4 shadow"
          link
          v-for="item in items"
        >
          <v-card-title class="d-flex justify-space-between">
            <div>
              <v-avatar
                :color="setAvatarColor(item.airline)"
                class="white--text mr-4"
                size="32"
              >
                <span class="body-1">
                  {{ item.airline }}
                </span>
              </v-avatar>

              <span class="subtitle-1">
                {{ item.fltno }} / {{ item.acreg }}
              </span>
            </div>

            <span class="caption">{{ item.date | dateFormat }} </span>
          </v-card-title>

          <v-card-text>
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
                <span>{{ item.check }}</span>
              </v-col>
            </v-row>

            <v-row class="ma-0">
              <v-col class="pa-0" cols="6" sm="3">
                <span class="font-weight-bold">Engineer: </span>
                <span>{{ item.eic }}</span>
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
        ></v-pagination>
      </template>
    </v-data-iterator>

    <p class="text-center title" v-if="items.length === 0">No flights found.</p>
  </div>
</template>

<script>
import { format } from 'date-fns';

export default {
  name: 'FlightsListMobile',

  props: {
    flights: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      items: [],
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
      const calculatedLength = this.items.length / defaultLength;

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
    this.items = this.flights;
  },
};
</script>

<style scoped></style>
