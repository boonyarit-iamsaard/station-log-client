<template>
  <v-container class="pa-0" style="max-width: 959px">
    <div class="mb-4">
      <span class="title">Home</span>
    </div>

    <v-row>
      <v-col
        :key="item.title"
        class="mx-auto"
        col="12"
        sm="4"
        v-for="item in items"
      >
        <v-card class="shadow" link :to="item.path">
          <v-img
            :src="item.src"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="150px"
          >
            <v-card-title
              class="font-weight-regular pa-2"
              v-text="item.title"
            />
          </v-img>
        </v-card>
      </v-col>
    </v-row>
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
          title: 'Customer Handling',
          icon: 'mdi-airplane',
          src: require('@/assets/images/third-party.jpg'),
          path: '/handling',
        },
      ],
    };
  },
};
</script>
