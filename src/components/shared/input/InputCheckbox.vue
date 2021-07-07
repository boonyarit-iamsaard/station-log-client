<template>
  <div style="height: 100%">
    <input-label :label="label" />

    <v-checkbox
      :hint="hint"
      :persistent-hint="!!hint"
      :rules="rules"
      class="mt-0 pt-0"
      v-model="model"
    />
  </div>
</template>

<script>
import InputLabel from '@/components/shared/input/InputLabel';
export default {
  name: 'InputCheckbox',

  components: {
    'input-label': InputLabel,
  },

  props: {
    hint: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: 'Label',
    },
    rules: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Boolean,
      default: false,
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

<style scoped>
/*noinspection CssUnusedSymbol*/
::v-deep .v-input__slot {
  margin-bottom: 20px;
}
</style>
