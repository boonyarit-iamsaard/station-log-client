<template>
  <v-container class="pa-0" style="max-width: 960px">
    <confirm-dialog
      @action="handleDeleteDisinfection"
      ref="confirmDialog"
      subtitle="This disinfection record will be deleted."
      title="Do you want to proceed?"
    />

    <v-form ref="form" @submit.prevent="submitForm">
      <div class="mb-4">
        <span class="title">Cabin Disinfection Form</span>
      </div>

      <v-card class="mb-4 shadow">
        <flight-form-title-wrapper title="Details" />

        <v-card-text>
          <v-row>
            <v-col
              :cols="item.xs"
              :key="item.name"
              :sm="item.sm"
              v-for="item in disinfectionFields"
            >
              <component
                :is="item.type"
                :hint="item.hint"
                :items="item.items"
                :label="item.label"
                :number="item.number"
                :prefix="item.prefix ? prefix : undefined"
                :rules="item.rules"
                :time="item.time"
                :upper-case="item.upperCase"
                @change="item.name === 'airline' ? onAirlineChange() : null"
                v-model="disinfection[item.name]"
              />
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="pb-4 pt-0 px-4">
          <div>
            <v-btn
              :disabled="!admin || !$route.params.id"
              @click="$refs.confirmDialog.dialog = true"
              class="shadow"
              color="error"
            >
              Delete
            </v-btn>
          </div>

          <v-spacer />

          <div>
            <v-btn @click="resetForm" class="shadow mr-4" color="secondary">
              Cancel
            </v-btn>

            <v-btn class="shadow" color="primary" type="submit">Save</v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-container>
</template>

<script>
import { cloneDeep } from 'lodash';
import { mapActions, mapGetters } from 'vuex';

import ConfirmDialog from '@/components/shared/ConfirmDialog';
import FlightFormTitleWrapper from '@/components/flights/FlightFormTitleWrapper';
import InputAutocomplete from '@/components/shared/input/InputAutocomplete';
import InputCheckbox from '@/components/shared/input/InputCheckbox';
import InputCombo from '@/components/shared/input/InputCombo';
import InputDate from '@/components/shared/input/InputDate';
import InputSelect from '@/components/shared/input/InputSelect';
import InputText from '@/components/shared/input/InputText';
import InputTextarea from '@/components/shared/input/InputTextarea';

import { defaultValues } from '@/components/disinfection/default-values';
import { disinfectionFields } from '@/components/disinfection/disinfection-form-fields';
import { disinfectionFormRules } from '@/components/disinfection/disinfection-form-rules';

export default {
  name: 'DisinfectionForm',

  components: {
    'confirm-dialog': ConfirmDialog,
    'flight-form-title-wrapper': FlightFormTitleWrapper,
    'input-autocomplete': InputAutocomplete,
    'input-checkbox': InputCheckbox,
    'input-combo': InputCombo,
    'input-date': InputDate,
    'input-select': InputSelect,
    'input-text': InputText,
    'input-textarea': InputTextarea,
  },

  data() {
    return {
      disinfection: { ...defaultValues },
      disinfectionFields: [...disinfectionFields],
      disinfectionRules: {},
    };
  },

  methods: {
    ...mapActions({
      addDisinfection: 'disinfection/addDisinfection',
      deleteDisinfection: 'disinfection/deleteDisinfection',
      fetchDisinfectionByID: 'disinfection/fetchDisinfectionByID',
      setErrorMessage: 'error/setErrorMessage',
      setIsError: 'error/setIsError',
      setShouldLoading: 'setShouldLoading',
      updateDisinfection: 'disinfection/updateDisinfection',
    }),

    async handleDeleteDisinfection() {
      this.setShouldLoading(true);

      try {
        await this.deleteDisinfection(this.$route.params.id);

        this.setShouldLoading(false);

        await this.$router.replace('/disinfection');
      } catch (error) {
        this.setShouldLoading(false);

        this.setIsError();
        this.setErrorMessage(error.message);
      }
    },

    async handleFetchDisinfectionByID(id) {
      this.setShouldLoading(true);

      try {
        const disinfection = await this.fetchDisinfectionByID(id);

        if (!disinfection) return;

        this.disinfection = cloneDeep(disinfection);
        this.setShouldLoading(false);
      } catch (error) {
        this.setShouldLoading(false);

        this.setIsError();
        this.setErrorMessage(error.message);
      }
    },

    onAirlineChange() {
      this.disinfection.tail = '';
    },

    resetForm() {
      this.disinfectionRules = {};
      this.disinfection = cloneDeep(defaultValues);

      this.$nextTick(() => {
        this.$router.replace('/disinfection');
      });
    },

    submitForm() {
      this.disinfectionRules = { ...disinfectionFormRules };

      Object.keys(this.disinfectionRules).forEach(key => {
        this.disinfectionFields.forEach(field => {
          if (field.name === key) {
            field.rules = this.disinfectionRules[key];
          }
        });
      });

      this.$nextTick(async () => {
        if (this.$refs.form.validate()) {
          this.setShouldLoading(true);

          this.disinfection.prefix = this.prefix;
          this.disinfection.acreg = this.prefix.concat(this.disinfection.tail);

          let disinfection;
          try {
            if (this.$route.params.id) {
              disinfection = await this.updateDisinfection(this.disinfection);
            } else {
              disinfection = await this.addDisinfection(this.disinfection);
            }
          } catch (error) {
            this.setShouldLoading(false);

            this.setIsError();
            this.setErrorMessage(error.message);
          }

          if (!disinfection) {
            this.setShouldLoading(false);
            return;
          }

          this.setShouldLoading(false);
          this.resetForm();
        }
      });
    },
  },

  computed: {
    ...mapGetters({
      admin: 'auth/getIsAdmin',
    }),

    prefix() {
      switch (this.disinfection.airline) {
        case 'ASL':
          return 'EI-';
        case 'PR':
          return 'RP-C';
        case 'KE':
        case 'OZ':
          return 'HL';
        case 'CX':
        case 'KA':
        case 'LD':
          return 'B-';
        default:
          return '';
      }
    },
  },

  created() {
    if (this.$route.params.id) {
      this.handleFetchDisinfectionByID(this.$route.params.id);
    }
  },
};
</script>

<style scoped>
/*noinspection CssUnusedSymbol*/
::v-deep .row {
  margin: -8px;
}

/*noinspection CssUnusedSymbol*/
::v-deep .col-12,
.col-sm-2,
.col-sm-3,
.col-sm-4 {
  padding: 0 8px;
}
</style>
