<template lang="pug">
    .progress__match__started
        h4="Owner of the room:"
        .progress__match__started--judge
            .progress__match__started--judge--avatar
              a(:href="`https://osu.ppy.sh/u/${judgeId}`" target="_blank")
                img(:src="avatarLink" alt="user_avatar")
            .progress__match__started--judge--nickname
              a(:href="`https://osu.ppy.sh/u/${judgeId}`" target="_blank")
                span {{userInfo.username}}
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import axios from 'axios';

@Component
export default class ProgressStarted extends Vue {
    @Prop() private judgeId!: number;

    userInfo:Record<string, unknown> = {};

    avatarLink = `https://a.ppy.sh/${this.judgeId}`;

    fetchUser = async () => {
      const results = await axios({
        method: 'get',
        url: `http://localhost:3000/users/${this.judgeId}`,
      })
        .then((data: any) => {
          if (data.data.result) {
            return data.data.result[0];
          }

          return { username: undefined };
        });

      return results;
    }

    async mounted() {
      const getUserFromApi = await this.fetchUser();

      this.userInfo = getUserFromApi;
      return 0;
    }
}

</script>

<style lang="sass">
    .progress__match__started
        display: flex
        flex-direction: column
        &--judge
            display: flex
            flex-direction: row
            align-items: center
            &--avatar
                max-height: 100%
                width: 100px
            &--nickname
                padding-left: 5px
                font-size: 24px
                a
                  color: inherit !important
</style>
