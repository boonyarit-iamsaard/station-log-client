<template>
  <v-container class="pa-0" style="max-width: 960px">
    <div class="mb-4">
      <span class="title">Home</span>
    </div>

    <v-row class="ma-n2">
      <v-col
        :key="item.title"
        class="mx-auto pa-2"
        cols="12"
        sm="4"
        v-for="item in items"
      >
        <v-card :class="item.class" link :to="item.path">
          <v-card-text class="text-center pb-0 pt-4">
            <v-badge
              :content="item.content || 0"
              color="error"
              overlap
              v-if="item.content > 0"
            >
              <v-icon large class="grey--text text--lighten-5">
                {{ item.icon }}
              </v-icon>
            </v-badge>

            <v-icon v-else large class="grey--text text--lighten-5">
              {{ item.icon }}
            </v-icon>
          </v-card-text>

          <v-card-title
            class="font-weight-regular pb-4 grey--text text--lighten-5 justify-center pa-2 subtitle-1"
            v-text="item.title"
          />
        </v-card>
      </v-col>
    </v-row>

    <FlightRemarkAndHandover v-if="authenticated" />

    <StationHandover v-if="authenticated" />

    <AogHandover v-if="authenticated" />
  </v-container>
</template>

<script>
// Import vues helpers
import { mapGetters } from 'vuex';

// Import components
import AogHandover from '@/components/dashboard/AogHandover.vue';
import FlightRemarkAndHandover from '@/components/dashboard/FlightRemarkAndHandover.vue';
import StationHandover from '@/components/dashboard/StationHandover.vue';

// Import store types
import { getPendingAogHandoverRecords } from '@/store/modules/aogHandoverRecord/aogHandoverRecordTypes';
import { getPendingStationHandoverRecords } from '@/store/modules/stationHandoverRecord/stationHandoverRecordTypes';

export default {
  name: 'HomePage',

  components: {
    FlightRemarkAndHandover,
    StationHandover,
    AogHandover,
  },

  computed: {
    ...mapGetters({
      authenticated: 'auth/getIsAuthenticated',
      pendingFlightHandoverRecords: 'flight/getPendingFlightHandoverRecords',
      pendingStationHandoverRecords: getPendingStationHandoverRecords,
    }),

    ...mapGetters('aogHandoverRecord', {
      pendingAogHandoverRecords: getPendingAogHandoverRecords,
    }),

    items() {
      return [
        {
          title: 'Flight Movement',
          src: require('@/assets/images/flight.jpg'),
          path: '/flights',
          icon: 'mdi-airplane',
          class: 'primary shadow',
          content: this.pendingFlightHandoverRecords,
        },
        {
          title: 'Spare Movement',
          src: require('@/assets/images/spare.jpg'),
          path: '/spares',
          icon: 'mdi-cogs',
          class: 'error shadow',
          content: 0,
        },
        {
          title: 'Cabin Disinfection',
          src: require('@/assets/images/disinfection.jpg'),
          path: '/disinfection',
          icon: 'mdi-spray',
          class: 'secondary shadow',
          content: 0,
        },
        {
          title: 'Sick Leave / OT',
          src: require('@/assets/images/roster.jpg'),
          path: '/manpower',
          icon: 'mdi-account-multiple',
          class: 'success shadow',
          content: 0,
        },
        {
          title: 'Station Handover',
          src: require('@/assets/images/flight.jpg'),
          path: '/station-handover',
          icon: 'mdi-file-edit',
          class: 'grey shadow',
          content: this.pendingStationHandoverRecords,
        },
        {
          title: 'AOG Handover',
          src: require('@/assets/images/flight.jpg'),
          path: '/aog-handover',
          icon: 'mdi-airplane-off',
          class: 'info shadow',
          content: this.pendingAogHandoverRecords,
        },
      ];
    },
  },
};
</script>
