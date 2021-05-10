<template lang="pug">
    .pagination__container
        p "page" {{ currentPage }} "of" {{ lastPage }}
        p(:class="{ delay: delay }")
            button(@click="prevPage")="prev"
            button(@click="nextPage")="next"
</template>
<script lang="ts">
import {
  Component, Vue, Watch,
} from 'vue-property-decorator';
import axios from 'axios';
import { usePagination } from 'vue-composable';
import VueCompositionAPI from '@vue/composition-api';

Vue.use(VueCompositionAPI);

@Component
export default class Pagination extends Vue {
    nextPage = {};

    prevPage = {};

    currentPage = {};

    lastPage ={};

    totalSize = 0;

    delay = false;

    countMatches = async () => {
      const results = await axios({
        method: 'get',
        url: 'http://localhost:3000/tournaments/countTournaments',
      })
        .then((data: any) => data.data);

      return results;
    }

    async attachDelay() {
      let delayVariable = this.delay;
      delayVariable = true;
      // remove delay
      setTimeout(() => {
        delayVariable = false;
      }, 1500);
    }

    async mounted() {
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
      this.attachDelay();
    };
}
</script>

<style lang="sass">
  .delay
    background: red
</style>
