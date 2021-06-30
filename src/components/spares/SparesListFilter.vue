<template>
  <v-row>
    <!-- TODO -->
    <!-- <v-col cols="4">
      <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="filters.dates"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            append-icon="mdi-calendar"
            dense
            label="Date"
            outlined
            readonly
            v-bind="attrs"
            v-on="on"
            :value="dateRange"
          ></v-text-field>
        </template>
        <v-date-picker v-model="filters.dates" range>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="modal = false"> Cancel </v-btn>
          <v-btn text color="primary" @click="$refs.dialog.save(filters.dates)">
            OK
          </v-btn>
        </v-date-picker>
      </v-dialog>
    </v-col> -->

    <v-col cols="12" md="2">
      <v-select
        :items="airlines"
        @change="onUpdateFiltersHandler"
        dense
        label="Airline"
        outlined
        v-model="filters.airline"
      />
    </v-col>

    <v-col cols="12" md="2">
      <v-select
        :items="types"
        @change="onUpdateFiltersHandler"
        dense
        label="Type"
        outlined
        v-model="filters.type"
      />
    </v-col>

    <v-col cols="12" md="2">
      <v-select
        :items="stores"
        @change="onUpdateFiltersHandler"
        dense
        label="Store"
        outlined
        v-model="filters.store"
      />
    </v-col>

    <v-col cols="12" md="2">
      <v-select
        :items="statuses"
        @change="onUpdateFiltersHandler"
        dense
        label="Status"
        outlined
        v-model="filters.status"
      />
    </v-col>

    <v-col cols="2">
      <v-btn
        block
        class="shadow"
        color="secondary"
        @click="onResetFiltersHandler"
      >
        <v-icon left>mdi-close</v-icon>
        RESET
      </v-btn>
    </v-col>

    <v-col cols="2">
      <v-btn block class="shadow" color="primary" link to="/spares/create">
        <v-icon left>mdi-plus</v-icon>
        ADD
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
// import { format } from 'date-fns';

export default {
  name: 'SparesListFilter',

  data() {
    return {
      filters: {
        airline: 'ALL',
        dates: [],
        status: 'ALL',
        store: 'ALL',
        type: 'ALL',
      },
      airlines: ['ALL', 'ASL', 'CX', 'KA', 'LD', 'PR'],
      statuses: ['ALL', 'Pending', 'Issued', 'Returned', 'Transferred'],
      stores: ['ALL', 'BKK', 'BKKAHK', 'BKK306'],
      types: ['ALL', 'Consumable', 'Fluid', 'Return'],
      modal: false,
    };
  },

  methods: {
    onResetFiltersHandler() {
      const initialFilters = {
        airline: 'ALL',
        store: 'ALL',
        status: 'ALL',
        type: 'ALL',
      };

      this.filters = initialFilters;

      this.$store.dispatch('spares/setFilters', initialFilters);
    },

    onUpdateFiltersHandler() {
      this.$store.dispatch('spares/setFilters', this.filters);
    },
  },

  computed: {
    // dateRange() {
    //   const dateFormat = 'dd MMM yy';
    //   const startDate = format(new Date(this.filters.dates[0]), dateFormat);
    //   const endDate = format(new Date(this.filters.dates[1]), dateFormat);
    //
    //   return `${startDate} - ${endDate}`;
    // },

    endDate() {
      return new Date().toISOString().substr(0, 10);
    },

    startDate() {
      const startDate =
        new Date(`${this.endDate}T00:00:00`).getTime() - 30 * 86400000;

      return new Date(startDate).toISOString().substr(0, 10);
    },
  },

  created() {
    this.filters.dates = [this.startDate, this.endDate];
  },
};
</script>

<style lang="scss" scoped></style>
