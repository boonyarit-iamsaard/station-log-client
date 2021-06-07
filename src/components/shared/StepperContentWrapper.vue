<template>
  <v-stepper-content class="pa-0" :step="step">
    <v-row class="ma-0">
      <v-col cols="12" sm="8" class="mx-auto pa-0">
        <v-card outlined class="pa-4 d-flex flex-column" min-height="600">
          <v-card-title class="d-flex justify-center pt-0">
            <span class="subtitle-2">{{ title }}</span>
          </v-card-title>

          <v-divider class="mb-4"></v-divider>

          <v-card-text class="pa-0 mb-auto">
            <slot></slot>
          </v-card-text>

          <v-divider class="mb-4"></v-divider>

          <v-card-actions class="d-flex justify-space-between pa-0">
            <v-btn color="secondary" depressed @click="clickBackOrCancel">
              {{ step === 1 ? 'CANCEL' : 'BACK' }}
            </v-btn>

            <v-btn color="primary" depressed @click="clickNextOrSave">
              {{ isLastStep ? 'SAVE' : 'NEXT' }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-stepper-content>
</template>

<script>
export default {
  name: 'StepperContentWrapper',

  props: {
    isLastStep: {
      type: Boolean,
      default: false,
    },
    step: {
      type: Number,
      default: 1,
    },
    title: {
      type: String,
      default: 'Title',
    },
  },

  methods: {
    clickBackOrCancel() {
      this.$emit('clickBackOrCancel');
    },

    clickNextOrSave() {
      this.$emit('clickNextOrSave');
    },
  },
};
</script>

<style scoped></style>
