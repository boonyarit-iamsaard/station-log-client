<template>
  <div>
    <v-data-iterator
      class="mb-14"
      :items="items"
      :items-per-page="5"
      :sort-by="['date']"
      :sort-desc="[true]"
      v-if="items.length > 0"
    >
      <template v-slot:default="{ items }">
        <v-card
          class="mb-4"
          link
          :outlined="$vuetify.breakpoint.smAndDown"
          :to="`/handling/edit/${item._id}`"
          :key="item._id"
          v-for="item in items"
        >
          <v-card-title>
            <span class="subtitle-1" v-if="item.airline === 'Other'">
              {{ item.otherAirline.concat(item.fltno) }}
            </span>
            <span class="subtitle-1" v-else>
              {{ item.airline.concat(item.fltno) }}
            </span>
          </v-card-title>

          <v-card-text>
            <v-row class="ma-0">
              <v-col class="pa-0" cols="6" sm="3">
                <span class="font-weight-bold">DATE: </span>
                <span>{{ setDateFormatHandler(item.date) }} </span>
              </v-col>

              <v-col class="pa-0" cols="6" sm="3">
                <span class="font-weight-bold">REG: </span>
                <span>{{ item.acreg }}</span>
              </v-col>

              <v-col class="pa-0" cols="6" sm="3">
                <span class="font-weight-bold">TYPE: </span>
                <span>{{ item.aircraftType }}</span>
              </v-col>

              <v-col class="pa-0" cols="6" sm="3">
                <span class="font-weight-bold">CHK: </span>
                <span v-if="item.check === 'Other'">{{ item.otherCheck }}</span>
                <span v-else>{{ item.check }}</span>
              </v-col>

              <v-col class="pa-0" cols="6" sm="3">
                <span class="font-weight-bold">EIC: </span>
                <span>{{ item.eic }}</span>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </template>
    </v-data-iterator>

    <p class="text-center title" v-if="items.length === 0">No record found.</p>
  </div>
</template>

<script>
import { format } from 'date-fns';

export default {
  name: 'HandlingListMobile',

  props: {
    handlingRecords: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      items: [],
    };
  },

  methods: {
    setDateFormatHandler(date) {
      return format(new Date(date), 'dd/MM/yy');
    },
  },

  created() {
    this.items = this.handlingRecords;
  },
};
</script>

<style scoped></style>
