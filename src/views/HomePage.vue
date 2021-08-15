<template>
  <v-container class="pa-0" style="max-width: 960px">
    <div class="mb-4">
      <span class="title">Home</span>
    </div>

    <v-row>
      <v-col
        :key="item.title"
        class="mx-auto"
        col="12"
        sm="3"
        v-for="item in items"
      >
        <v-card class="shadow" link :to="item.path">
          <v-img
            :src="item.src"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="120px"
          >
            <v-card-title
              class="font-weight-regular pa-2 subtitle-1"
              v-text="item.title"
            />
          </v-img>
        </v-card>
      </v-col>
    </v-row>

    <flight-remark-and-hand-over v-if="authenticated" />
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

import FlightRemarkAndHandover from '@/components/dashboard/FlightRemarkAndHandover';

export default {
  name: 'HomePage',

  components: {
    'flight-remark-and-hand-over': FlightRemarkAndHandover,
  },

  data() {
    return {
      items: [
        {
          title: 'Flight Movement',
          icon: 'mdi-airplane',
          src: require('@/assets/images/flight.jpg'),
          path: '/flights',
        },
        {
          title: 'Spare Movement',
          icon: 'mdi-airplane',
          src: require('@/assets/images/spare.jpg'),
          path: '/spares',
        },
        {
          title: 'Cabin Disinfection',
          icon: 'mdi-airplane',
          src: require('@/assets/images/disinfection.jpg'),
          path: '/disinfection',
        },
        {
          title: 'Sick Leave / OT Record',
          icon: 'mdi-account',
          src: require('@/assets/images/roster.jpg'),
          path: '/manpower',
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
