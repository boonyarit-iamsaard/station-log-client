<template>
  <div class="mb-4 pa-4 white rounded">
    <v-row>
      <v-col cols="12" sm="2">
        <input-select
          :items="airlines"
          label="Airline"
          v-model="model.airline"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import InputSelect from '@/components/shared/input/InputSelect';

export default {
  name: 'FlightListFilter',

  components: {
    'input-select': InputSelect,
  },

  props: {
    value: {
      type: Object,
      default: () => ({
        airline: 'ALL',
      }),
    },
  },

  data() {
    return {
      airlines: ['ALL', 'ASL', 'CX', 'KA', 'LD', 'PR'],
    };
  },

  computed: {
    model: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
</script>

<style scoped>
/*noinspection ALL*/
::v-deep .row {
  margin: -8px;
}

/*noinspection ALL*/
::v-deep .col-12,
.col-sm-2,
.col-sm-3,
.col-sm-4 {
  padding: 0 8px;
}
</style>
