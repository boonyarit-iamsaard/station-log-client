<template>
  <v-container class="pa-0" style="max-width: 960px">
    <ConfirmDialog
      @action="onDeleteAogHandoverRecord"
      ref="confirmDialog"
      subtitle="This
    AOG handover record will be deleted."
      title="Do you want to proceed?"
    />

    <v-form ref="form" @submit.prevent="onSubmitForm">
      <div class="mb-4">
        <span class="title">AOG Handover Form</span>
      </div>

      <v-card class="mb-4 shadow">
        <FlightFormTitleWrapper title="Flight Details" />

        <v-card-text>
          <v-row>
            <v-col
              :cols="item.xs"
              :key="item.name"
              :sm="item.sm"
              v-for="item in aogHandoverFormFlightDetailsFields"
            >
              <component
                :clearable="item.clearable"
                :is="item.type"
                :hint="item.hint"
                :items="item.items"
                :label="item.label"
                :number="item.number"
                :prefix="item.prefix ? aogHandoverRecord.prefix : undefined"
                :rules="item.rules"
                :time="item.time"
                :upper-case="item.upperCase"
                @change="onChange(item.name)"
                v-model="aogHandoverRecord[item.name]"
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <AogHandoverFormHandoverDetails
        :rules="aogHandoverFormRules.details"
        @appendFieldArray="appendFieldArray"
        @removeFieldArray="removeFieldArray"
        v-model="aogHandoverRecord.details"
      />

      <v-card class="shadow">
        <v-card-actions class="pa-4">
          <div>
            <v-btn
              :disabled="!isAdmin || !$route.params.id"
              @click="$refs.confirmDialog.dialog = true"
              class="shadow"
              color="error"
            >
              Delete
            </v-btn>
          </div>

          <v-spacer />

          <div>
            <v-btn @click="onResetForm" class="shadow mr-4" color="secondary">
              Cancel
            </v-btn>

            <v-btn
              :disabled="aogHandoverRecord.details.length < 1"
              class="shadow"
              color="primary"
              type="submit"
              >Save</v-btn
            >
          </div>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-container>
</template>

<script>
// Import modules
import { cloneDeep } from 'lodash';
import { mapActions, mapGetters } from 'vuex';

// Import components
import AogHandoverFormHandoverDetails from '@/features/aogHandover/components/AogHandoverFormHandoverDetails.vue';
import ConfirmDialog from '@/components/shared/ConfirmDialog.vue';
import FlightFormTitleWrapper from '@/components/flights/FlightFormTitleWrapper.vue';
import InputCombo from '@/components/shared/input/InputCombo.vue';
import InputDate from '@/components/shared/input/InputDate.vue';
import InputText from '@/components/shared/input/InputText.vue';

// Import helpers
import { aogHandoverFormDefaultValues } from '@/features/aogHandover/helpers/aogHandoverFormDefaultValues';
import { aogHandoverFormFlightDetailsFields } from '@/features/aogHandover/helpers/aogHandoverFormFields';
import { aogHandoverFormRules } from '@/features/aogHandover/helpers/aogHandoverFormRules';

// Import store types
import {
  addAogHandoverRecord,
  removeAogHandoverRecord,
  updateAogHandoverRecord,
} from '@/store/modules/aogHandoverRecord/aogHandoverRecordTypes';

// Import utils
import { IDGenerator } from '@/utils/id-generator';
import { currentDate } from '@/utils/currentDate';

// Import api
import { fetchAogHandoverRecordByID } from '@/api/aogHandoverApi';

export default {
  name: 'AogHandoverForm',

  components: {
    ConfirmDialog,
    FlightFormTitleWrapper,
    InputCombo,
    InputDate,
    InputText,
    AogHandoverFormHandoverDetails,
  },

  data() {
    return {
      aogHandoverRecord: cloneDeep(aogHandoverFormDefaultValues),
      aogHandoverFormFlightDetailsFields: [
        ...aogHandoverFormFlightDetailsFields,
      ],
      aogHandoverFormRules: {},
      fieldArray: {
        details: {
          recordDate: currentDate(),
          recordBy: '',
          details: '',
          isAcknowledged: false,
          acknowledgedBy: '',
          acknowledgedDate: '',
        },
      },
    };
  },

  methods: {
    ...mapActions('aogHandoverRecord', {
      addAogHandoverRecord,
      removeAogHandoverRecord,
      updateAogHandoverRecord,
    }),

    ...mapActions({
      setErrorMessage: 'error/setErrorMessage',
      setIsError: 'error/setIsError',
      setShouldLoading: 'setShouldLoading',
    }),

    appendFieldArray(name) {
      this.aogHandoverRecord[name].push({
        _id: IDGenerator(),
        ...this.fieldArray[name],
      });
    },

    removeFieldArray({ id, name }) {
      this.aogHandoverRecord[name] = this.aogHandoverRecord[name].filter(
        field => field._id !== id
      );
    },

    currentDate,

    /**
     * Check field name and invoke related function
     */
    onChange(name) {
      if (name === 'airline') {
        this.onSetPrefix();
      }
    },

    async onDeleteAogHandoverRecord() {
      this.setShouldLoading(true);

      try {
        await this.removeAogHandoverRecord(this.$route.params.id);

        this.setShouldLoading(false);

        if (this.$route.params.fromPath) {
          await this.$router.replace(this.$route.params.fromPath);
        } else {
          await this.$router.replace('/aog-handover');
        }
      } catch (error) {
        this.setShouldLoading(false);

        this.setIsError();
        this.setErrorMessage(error.message);
      }
    },

    onResetForm() {
      this.aogHandoverFormRules = {};
      this.aogHandoverRecord = cloneDeep(aogHandoverFormDefaultValues);

      this.$nextTick(() => {
        if (this.$route.params.fromPath) {
          this.$router.replace(this.$route.params.fromPath);
        } else {
          this.$router.replace('/aog-handover');
        }
      });
    },

    onSubmitForm() {
      this.aogHandoverFormRules = cloneDeep(aogHandoverFormRules);

      Object.keys(this.aogHandoverFormRules).forEach(key => {
        this.aogHandoverFormFlightDetailsFields.forEach(field => {
          if (field.name === key) {
            field.rules = this.aogHandoverFormRules[key];
          }
        });
      });

      this.$nextTick(async () => {
        if (this.$refs.form.validate()) {
          this.setShouldLoading(true);

          this.aogHandoverRecord.acreg = this.prefix.concat(
            this.aogHandoverRecord.tail
          );

          let aogHandoverRecord;
          try {
            if (this.$route.params.id) {
              aogHandoverRecord = await this.updateAogHandoverRecord(
                this.aogHandoverRecord
              );
            } else {
              aogHandoverRecord = await this.addAogHandoverRecord(
                this.aogHandoverRecord
              );
            }
          } catch (error) {
            this.setShouldLoading(false);

            this.setIsError();
            this.setErrorMessage(error.message);
          }

          if (!aogHandoverRecord) {
            this.setShouldLoading(false);
            return;
          }

          this.setShouldLoading(false);
          this.onResetForm();
        }
      });
    },

    async onSetAogHandoverRecord(id) {
      this.setShouldLoading(true);

      try {
        const response = await fetchAogHandoverRecordByID(id);
        const { record: aogHandoverRecord } = response.data;

        if (!aogHandoverRecord) return;

        this.aogHandoverRecord = cloneDeep(aogHandoverRecord);
        this.setShouldLoading(false);
      } catch (error) {
        this.setShouldLoading(false);

        this.setIsError();
        this.setErrorMessage(error.message);
      }
    },

    onSetPrefix() {
      switch (this.aogHandoverRecord.airline) {
        case 'ASL':
          this.aogHandoverRecord.prefix = 'EI-';
          break;
        case 'PR':
          this.aogHandoverRecord.prefix = 'RP-C';
          break;
        case 'CX':
        case 'KA':
        case 'LD':
          this.aogHandoverRecord.prefix = 'B-';
          break;
        default:
          this.aogHandoverRecord.prefix = '';
      }

      this.aogHandoverRecord.tail = '';
      this.aogHandoverRecord.fltno = '';
    },
  },

  computed: {
    ...mapGetters({
      isAdmin: 'auth/getIsAdmin',
    }),

    isAcknowledged() {
      return this.aogHandoverRecord.isAcknowledged;
    },

    prefix() {
      switch (this.aogHandoverRecord.airline) {
        case 'ASL':
          return 'EI-';
        case 'PR':
          return 'RP-C';
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
      this.onSetAogHandoverRecord(this.$route.params.id);
    }
  },
};
</script>

<style lang="scss" scoped>
::v-deep .row {
  margin: -8px;
}

::v-deep .col-12,
.col-sm-2,
.col-sm-3,
.col-sm-4 {
  padding: 0 8px;
}
</style>
