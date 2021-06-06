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
          class="mb-4 d-flex flex-row"
          link
          outlined
          :key="item._id"
          :to="{
            name: 'sparesEdit',
            params: {
              id: item._id,
            },
          }"
          v-for="item in items"
        >
          <v-card-title>
            <v-avatar color="primary" class="white--text" size="40">
              <span class="body-1" v-if="item.airline === 'Other'">
                {{ item.otherAirline }}
              </span>
              <span class="body-1" v-else>
                {{ item.airline }}
              </span>
            </v-avatar>
          </v-card-title>

          <v-card-text class="py-2 pr-2 pl-0">
            <div class="d-flex flex-column">
              <div class="d-flex justify-space-between align-center">
                <span class="subtitle-1">
                  {{ item.fltno }} {{ item.acreg }}
                </span>
                <span class="caption">{{ item.date | formattedDate }} </span>
              </div>
              <div class="d-flex justify-space-between align-center">
                <span>{{ item.check }} {{ item.bay }}</span>
                <span>{{ item.eic }}</span>
              </div>
            </div>
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
    setAvatarColor(type) {
      switch (type) {
        case 'Consumable':
          return 'primary';
        case 'Return':
          return 'error';
        default:
          return 'secondary';
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
    formattedDate(value) {
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
