<template>
  <v-dialog v-model="dialog" persistent max-width="300">
    <v-card class="shadow">
      <v-card-title class="title pa-4">{{ title }} </v-card-title>

      <v-card-subtitle class="pa-4">{{ subtitle }}</v-card-subtitle>

      <v-card-actions class="pb-4 pt-0 px-4">
        <v-btn color="primary" text @click="dialog = false"> cancel </v-btn>

        <v-spacer></v-spacer>

        <v-btn color="error" text @click="closeDialog"> confirm </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ConfirmDialog',

  props: {
    title: {
      type: String,
      default: () => 'Title',
    },
    subtitle: {
      type: String,
      default: () => 'Subtitle',
    },
  },

  data() {
    return {
      dialog: false,
    };
  },

  methods: {
    closeDialog() {
      this.$emit('action');
      this.dialog = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
