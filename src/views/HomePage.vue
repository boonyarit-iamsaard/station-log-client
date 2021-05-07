<template>
  <v-container class="pa-0">
    <div class="mx-auto" style="max-width: 959px">
      <v-row>
        <v-col
          v-for="item in items"
          :key="item.title"
          class="mx-auto"
          col="12"
          sm="4"
        >
          <v-card link :to="item.path">
            <v-img
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="150px"
              :src="item.src"
            >
              <v-card-title
                class="font-weight-regular"
                v-text="item.title"
              ></v-card-title>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
      <p class="text-center title mt-8">Dashboard is comming soon.....</p>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'HomePage',

  data() {
    return {
      items: [
        {
          title: 'Flight Movement',
          icon: 'mdi-airplane',
          src: require('../assets/images/flight.jpg'),
          path: '/flights',
        },
        {
          title: 'Spare Movement',
          icon: 'mdi-airplane',
          src: require('../assets/images/spare.jpg'),
          path: '/spares',
        },
        {
          title: '3rd Party Handling',
          icon: 'mdi-airplane',
          src: require('../assets/images/third-party.jpg'),
          path: '/handling',
        },
      ],
    };
  },
};
</script>
