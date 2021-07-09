<template>
  <div class="mx-auto" style="max-width: 1263px">
    <div class="mb-4">
      <span class="title">Spare Movement</span>
    </div>

    <v-data-table
      :headers="headers"
      :items="items"
      :sort-by="['date', 'airline']"
      :sort-desc="[true, false]"
      class="shadow"
    >
      <template v-slot:top>
        <div class="pa-4">
          <SparesListFilter />
        </div>
      </template>

      <template v-slot:item.date="{ item }">
        {{ setDateFormatHandler(item.date) }}
      </template>

      <template v-slot:item.type="{ item }">
        <v-avatar :color="setSpareTypeColorHandler(item.type)" size="32">
          <span class="white--text">{{ item.type.substr(0, 1) }}</span>
        </v-avatar>
      </template>

      <template v-slot:item.status="{ item }">
        <v-icon :color="setSpareStatusHandler(item.type, item.status).color">{{
          setSpareStatusHandler(item.type, item.status).icon
        }}</v-icon>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-btn
          class="mr-2"
          icon
          link
          :to="{
            name: 'spares-edit',
            params: { id: item._id },
          }"
        >
          <v-icon> mdi-pencil </v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { format } from 'date-fns';
import { mapGetters } from 'vuex';

import SparesListFilter from '@/components/spares/SparesListFilter';

export default {
  name: 'SparesListDesktop',

  components: { SparesListFilter },

  props: {
    spares: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      headers: [
        { text: 'Date', value: 'date' },
        {
          text: 'Airline',
          value: 'airline',
          filter: value =>
            this.onUpdateFiltersHandler(value, this.filters.airline),
        },
        { text: 'Flt No.', value: 'fltno' },
        {
          text: 'Type',
          value: 'type',
          filter: value =>
            this.onUpdateFiltersHandler(value, this.filters.type),
        },
        { text: 'Part No.', value: 'part' },
        { text: 'Description', value: 'desc' },
        {
          text: 'Store',
          value: 'store',
          filter: value =>
            this.onUpdateFiltersHandler(value, this.filters.store),
        },
        {
          text: 'Status',
          value: 'status',
          filter: value =>
            this.onUpdateFiltersHandler(value, this.filters.status),
        },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      items: [],
    };
  },

  methods: {
    setDateFormatHandler(date) {
      return format(new Date(date), 'dd MMM yy');
    },

    setSpareTypeColorHandler(type) {
      switch (type) {
        case 'Consumable':
          return 'primary';
        case 'Return':
          return 'error';
        default:
          return 'secondary';
      }
    },

    onUpdateFiltersHandler(value, filter) {
      if (filter === 'ALL') return true;
      return value === filter;
    },

    setSpareStatusHandler(type, status) {
      switch (type) {
        case 'Return':
          switch (status) {
            case 'Transferred':
              return { icon: 'mdi-check-circle-outline', color: 'primary' };
            case 'Returned':
              return {
                icon: 'mdi-alert-circle-check-outline',
                color: 'info',
              };
            case 'Issued':
              return {
                icon: 'mdi-alert-circle-check-outline',
                color: 'secondary',
              };
            default:
              return { icon: 'mdi-alert-circle-outline', color: 'error' };
          }
        default:
          switch (status) {
            case 'Issued':
              return { icon: 'mdi-check-circle-outline', color: 'primary' };
            default:
              return { icon: 'mdi-alert-circle-outline', color: 'error' };
          }
      }
    },
  },

  computed: {
    ...mapGetters({
      filters: 'spares/getFilters',
    }),
  },

  created() {
    this.items = this.spares;
  },
};
</script>

<style lang="scss" scoped></style>
