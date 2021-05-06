<template lang="pug">
    .pagination__container
        p "page" {{ currentPage }} "of" {{ lastPage }}
        p
            button(@click="prevPage")="prev"
            button(@click="nextPage")="next"
</template>
<script lang="ts">
import {
  Component, Vue, Watch,
} from 'vue-property-decorator';
import axios from 'axios';
import { usePagination } from 'vue-composable';
import VueCompositionApi from '@vue/composition-api';

Vue.use(VueCompositionApi);

@Component
export default class SingleMatch extends Vue {
    nextPage = '';

    prevPage = '';

    currentPage = '';

    lastPage = '';

    nicePage = '';

    totalSize = '';

    countMatches = async () => {
      const results = await axios({
        method: 'get',
        url: 'http://localhost:3000/tournaments/countTournaments',
      })
        .then((data: any) => data.data);

      return results;
    }

    async created() {
      this.totalSize = await this.countMatches();

      const {
        currentPage, lastPage, next, prev,
      } = usePagination({
        currentPage: 1,
        pageSize: 5,
        total: this.totalSize,
      });

      this.nextPage = next;

      this.prevPage = prev;

      this.currentPage = currentPage;

      this.lastPage = lastPage;
    }

    @Watch('currentPage.value', { immediate: true, deep: true })
    loadTournaments = (newValue: string) => {
      this.$emit('getTournamentsPage', newValue);
    };
}
</script>

<style lang="sass">
</style>
