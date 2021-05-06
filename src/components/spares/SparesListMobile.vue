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
          :flat="$vuetify.breakpoint.smAndDown"
          :outlined="$vuetify.breakpoint.mdAndUp"
          :to="{
            name: 'sparesEdit',
            params: {
              id: item._id,
            },
          }"
          v-for="item in items"
          :key="item._id"
        >
          <v-card-title>
            <span class="subtitle-1">{{ item.part }} / {{ item.desc }}</span>
          </v-card-title>

          <v-divider></v-divider>

          <v-card-text>
            <v-row class="ma-0">
              <v-col class="pa-0" cols="6" sm="3">
                <span class="font-weight-bold">DATE: </span>
                <span>{{ setDateFormatHandler(item.date) }} </span>
              </v-col>

              <v-col class="pa-0" cols="6" sm="3">
                <span class="font-weight-bold">FLT: </span>
                <span>{{ item.airline.concat(item.fltno) }}&nbsp;&nbsp;</span>
              </v-col>

              <v-col class="pa-0" cols="6" sm="3">
                <span class="font-weight-bold">REG: </span>
                <span>{{ item.acreg }}</span>
              </v-col>
            </v-row>

            <v-row class="ma-0">
              <v-col class="pa-0" cols="6" sm="3">
                <span class="font-weight-bold">S/N: </span>
                <span>{{ item.serial }}</span>
              </v-col>

              <v-col class="pa-0" cols="6" sm="3">
                <span class="font-weight-bold">GRN: </span>
                <span>{{ item.grn.substr(3, 7) }}</span>
              </v-col>

              <v-col class="pa-0" cols="6" sm="3">
                <span class="font-weight-bold">STORE: </span>
                <span>{{ item.store }}</span>
              </v-col>

              <v-col class="pa-0" cols="6" sm="3">
                <span class="font-weight-bold">STATUS: </span>
                <span>{{ item.status }}</span>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </template>
    </v-data-iterator>

    <p class="text-center title" v-if="items.length === 0">No spares found.</p>
  </div>
</template>

<script>
import { format } from 'date-fns';

export default {
  name: 'SparesListMobile',

  props: {
    spares: {
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
    this.items = this.spares;
  },
};
</script>

<style lang="scss" scoped>
::v-deep .v-expansion-panel-content__wrap {
  padding: 0;
}
</style>
