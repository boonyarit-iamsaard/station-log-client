<template>
  <div>
    <v-data-iterator
      :items-per-page.sync="itemsPerPage"
      :items="spares"
      :page.sync="page"
      :sort-by="['date', 'createdAt']"
      :sort-desc="[true, true]"
      class="mb-14"
      hide-default-footer
      v-if="spares.length > 0"
    >
      <template v-slot:default="{ items }">
        <v-card
          :key="item._id"
          :to="{
            name: 'spares-edit',
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
                :color="setAvatarColor(item.type)"
                class="white--text mr-4"
                size="32"
              >
                <span class="body-2">
                  {{ item.type.substr(0, 1) }}
                </span>
              </v-avatar>
              <span class="subtitle-1">{{ item.part }} / {{ item.desc }}</span>
            </div>
            <span class="caption">{{ setDateFormatHandler(item.date) }} </span>
          </v-card-title>

          <v-card-text>
            <v-row class="ma-0">
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

      <template v-slot:footer>
        <v-pagination
          :length="calculatePageLength"
          :total-visible="5"
          circle
          v-model="page"
        ></v-pagination>
      </template>
    </v-data-iterator>

    <v-card class="shadow" v-if="spares.length === 0">
      <v-card-text>
        <span> No spare movement found. </span>
      </v-card-text>
    </v-card>
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
      itemsPerPage: 5,
      itemsPerPageArray: [5, 10, 20],
      page: 1,
    };
  },

  methods: {
    setDateFormatHandler(date) {
      return format(new Date(date), 'dd/MM/yy');
    },

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
      const calculatedLength = this.spares.length / defaultLength;

      return calculatedLength < 1 ? 1 : Math.floor(calculatedLength);
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .v-expansion-panel-content__wrap {
  padding: 0;
}
</style>
