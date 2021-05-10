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

    lastPage = {};

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
      this.delay = true;
      // remove delay
      setTimeout(() => {
        this.delay = false;
      }, 500);
    }

    async mounted() {
      this.totalSize = await this.countMatches();

      const {
        currentPage, lastPage, next, prev, first,
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

    @Watch('currentPage.value')
    loadTournaments = (newValue = '1') => {
      this.$emit('getTournamentsPage', newValue);
      this.attachDelay();
    };
}
</script>

<style lang="sass">
  .delay
    button
      position: relative
      color: grey
      &:after
        z-index: 999
        position: absolute
        left: 0
        top: 0
        content: ''
        width: 100%
        height: 100%
</style>
