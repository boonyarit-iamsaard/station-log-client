<template>
  <div class="d-flex pa-4">
    <div class="date-container mr-4">
      <input-date label="From" v-model="model.dateRange[0]" />
    </div>

    <div class="date-container mr-4">
      <input-date label="To" v-model="model.dateRange[1]" />
    </div>

    <div>
      <v-btn @click="resetDateRange" class="mt-6" color="info" outlined>
        Reset
      </v-btn>
    </div>

    <v-spacer />

    <div class="mr-4">
      <input-text
        clearable
        label="Search"
        prepend-inner-icon="mdi-magnify"
        v-model="model.search"
      />
    </div>

    <v-btn :to="link" class="mt-6" color="primary" link>New</v-btn>
  </div>
</template>

<script>
import InputText from '@/components/shared/input/InputText';
import InputDate from '@/components/shared/input/InputDate';

export default {
  name: 'ListDesktopHeader',

  props: {
    link: {
      type: String,
      default: '/',
    },
    value: {
      type: Object,
      default: () => ({
        dateRange: ['2021-01-01', new Date().toISOString().substr(0, 10)],
        fromDate: ['2021-01-01'],
        search: '',
      }),
    },
  },

  components: {
    'input-date': InputDate,
    'input-text': InputText,
  },

  methods: {
    resetDateRange() {
      this.model.dateRange = [
        this.value.fromDate,
        new Date().toISOString().substr(0, 10),
      ];
    },
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

<style lang="scss" scoped>
.date-container {
  max-width: 200px;
}
</style>
