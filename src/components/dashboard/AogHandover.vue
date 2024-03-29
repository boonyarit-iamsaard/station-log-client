<template>
  <div class="mt-4">
    <div class="d-flex align-center justify-space-between">
      <span class="font-weight-bold mr-4 subtitle-1">AOG Handover</span>

      <v-checkbox v-model="isPending">
        <template v-slot:label>
          <span class="caption">Pending</span>
        </template>
      </v-checkbox>
    </div>

    <v-data-iterator
      :items-per-page.sync="itemsPerPage"
      :items="filteredAogHandoverRecords"
      :page.sync="page"
      :sort-by="['recordDate', 'createdAt']"
      :sort-desc="[true, true]"
      :class="$route.path === '/' ? 'mb-4' : 'mb-14'"
      hide-default-footer
      v-if="filteredAogHandoverRecords.length > 0"
    >
      <template v-slot:default="{ items }">
        <v-row class="ma-0" justify="center">
          <v-expansion-panels>
            <v-expansion-panel
              class="shadow mb-4 rounded"
              v-for="item in items"
              :key="item._id"
            >
              <v-expansion-panel-header
                :hide-actions="$vuetify.breakpoint.xs"
                class="align-stretch align-sm-center flex-column flex-sm-row px-4 py-2"
              >
                <div
                  class="d-flex justify-sm-start justify-space-between align-center"
                >
                  <div class="d-flex align-center">
                    <AirlineAvatarWrapper :airline="item.airline" />

                    <span class="subtitle-1 mx-4">
                      {{ item.fltno }} / {{ item.acreg }}
                    </span>
                  </div>

                  <span>
                    <v-icon v-if="isAcknowledged(item.details)" color="primary">
                      mdi-check-circle-outline
                    </v-icon>

                    <v-icon v-else color="error">
                      mdi-alert-circle-outline
                    </v-icon>
                  </span>
                </div>

                <div
                  class="d-flex align-start align-sm-end flex-column mr-0 mt-2 mt-sm-0 mr-sm-4"
                >
                  <span class="caption">{{ item.fltDate | dateFormat }}</span>
                </div>
              </v-expansion-panel-header>

              <v-expansion-panel-content>
                <v-row class="ma-0">
                  <v-col class="pa-0" cols="12">
                    <div class="d-block">
                      <span class="body-2 font-weight-bold">
                        Handover Details
                      </span>

                      <v-btn
                        class="mr-2"
                        icon
                        link
                        :to="{
                          name: 'aog-handover-edit',
                          params: {
                            fromPath: $route.fullPath,
                            id: item._id,
                          },
                        }"
                      >
                        <v-icon> mdi-pencil</v-icon>
                      </v-btn>
                    </div>

                    <v-card
                      class="grey lighten-4 pa-4 mb-4"
                      elevation="0"
                      :key="detail._id"
                      v-for="detail in item.details"
                    >
                      <span class="caption d-block">
                        Record by :
                        {{ detail.recordBy }} on
                        {{ detail.recordDate | dateFormat }}
                      </span>

                      <span
                        class="caption d-block"
                        v-if="detail.acknowledgedBy"
                      >
                        Acknowledged by :
                        {{ detail.acknowledgedBy }} on
                        {{ detail.acknowledgedDate | dateFormat }}
                      </span>

                      <span class="body-2 mt-2 remark"
                        >{{ detail.details }}
                      </span>
                    </v-card>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-pagination
          :length="calculatePageLength"
          :total-visible="5"
          circle
          v-if="calculatePageLength > 1"
          v-model="page"
        />
      </template>
    </v-data-iterator>

    <v-card class="shadow" v-if="filteredAogHandoverRecords.length === 0">
      <v-card-text>
        <span> No pending AOG handover record found. </span>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
// Import vuex helpers
import { mapActions, mapGetters } from 'vuex';

// Import utils
import { dateFormat } from '@/utils/dateFormat';

// Import store types
import {
  fetchAogHandoverRecords,
  getAogHandoverRecords,
} from '@/store/modules/aogHandoverRecord/aogHandoverRecordTypes';
import AirlineAvatarWrapper from '@/components/shared/AirlineAvatarWrapper.vue';

export default {
  components: { AirlineAvatarWrapper },
  name: 'AogHandover',

  data() {
    return {
      isPending: true,
      itemsPerPage: 5,
      itemsPerPageArray: [5, 10, 20],
      page: 1,
    };
  },

  methods: {
    ...mapActions('aogHandoverRecord', {
      fetchAogHandoverRecords,
    }),

    ...mapActions({
      setErrorMessage: 'error/setErrorMessage',
      setIsError: 'error/setIsError',
      setShouldLoading: 'setShouldLoading',
    }),

    async setAogHandoverRecords() {
      this.setShouldLoading(true);

      try {
        await this.fetchAogHandoverRecords().then(() => {
          this.setShouldLoading(false);
        });
      } catch (err) {
        this.setShouldLoading(false);

        await this.setIsError();
        await this.setErrorMessage(err.message);
      }
    },
  },

  computed: {
    ...mapGetters('aogHandoverRecord', {
      aogHandoverRecords: getAogHandoverRecords,
    }),

    isAcknowledged() {
      return function (details) {
        return details.every(detail => detail.isAcknowledged);
      };
    },

    calculatePageLength() {
      const defaultLength = 5;
      const calculatedLength =
        this.filteredAogHandoverRecords.length / defaultLength;

      return calculatedLength < 1 ? 1 : Math.ceil(calculatedLength);
    },

    filteredAogHandoverRecords() {
      return this.isPending
        ? this.aogHandoverRecords.filter(record =>
            record.details.some(detail => !detail.isAcknowledged)
          )
        : this.aogHandoverRecords;
    },
  },

  filters: {
    dateFormat,
  },

  created() {
    if (this.$route.path === '/aog-handover') {
      this.isPending = false;
    }

    if (this.aogHandoverRecords.length === 0) {
      this.setAogHandoverRecords();
    }
  },
};
</script>

<style scoped>
::v-deep .v-expansion-panel::before {
  box-shadow: none;
}

::v-deep .v-expansion-panel:not(:first-child)::after {
  border-top: none;
}

::v-deep .v-expansion-panel-content__wrap {
  padding: 0 1rem;
}

.v-expansion-panel--active:not(:first-child),
.v-expansion-panel--active + .v-expansion-panel {
  margin-top: 0;
}
.remark {
  white-space: pre-wrap;
}
</style>
