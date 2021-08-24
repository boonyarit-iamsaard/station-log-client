<template>
  <v-container class="pa-0" style="max-width: 960px">
    <div class="mb-4">
      <span class="title">Home</span>
    </div>

    <v-row class="ma-n2">
      <v-col
        :key="item.title"
        class="mx-auto pa-2"
        col="12"
        sm="4"
        v-for="item in items"
      >
        <v-card class="shadow" link :to="item.path">
          <v-img
            :src="item.src"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="100px"
          >
            <v-card-title
              class="font-weight-regular pa-2 subtitle-1"
              v-text="item.title"
            />
          </v-img>
        </v-card>
      </v-col>
    </v-row>

    <FlightRemarkAndHandover v-if="authenticated" />

    <StationHandover v-if="authenticated" />

    <AogHandover v-if="authenticated" />
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

import FlightRemarkAndHandover from '@/components/dashboard/FlightRemarkAndHandover.vue';
import StationHandover from '@/components/dashboard/StationHandover.vue';
import AogHandover from '@/components/dashboard/AogHandover.vue';

export default {
  name: 'HomePage',

  components: {
    FlightRemarkAndHandover,
    StationHandover,
    AogHandover,
  },

  data() {
    return {
      items: [
        {
          title: 'Flight Movement',
          src: require('@/assets/images/flight.jpg'),
          path: '/flights',
        },
        {
          title: 'Spare Movement',
          src: require('@/assets/images/spare.jpg'),
          path: '/spares',
        },
        {
          title: 'Cabin Disinfection',
          src: require('@/assets/images/disinfection.jpg'),
          path: '/disinfection',
        },
        {
          title: 'Sick Leave / OT',
          src: require('@/assets/images/roster.jpg'),
          path: '/manpower',
        },
        {
          title: 'Station Handover',
          src: require('@/assets/images/flight.jpg'),
          path: '/station-handover',
        },
        {
          title: 'AOG Handover',
          src: require('@/assets/images/flight.jpg'),
          path: '/aog-handover',
        },
      ],
    };
  },

  computed: {
    ...mapGetters({
      authenticated: 'auth/getIsAuthenticated',
    }),
  },
};
</script>
