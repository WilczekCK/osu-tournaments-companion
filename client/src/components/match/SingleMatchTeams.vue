<template lang="pug">
  .teams__container(v-if="loaded == true")
    .teams__container--blue
        .teams__container__member(v-for="playerId in teams.red" style="background:url('https://osu.ppy.sh/images/headers/profile-covers/c4.jpg')")
            .teams__container__member--avatar
                img(:src="player.getAvatarUrl(playerId)" alt="user_avatar")
            .teams__container__member--nickname
                p {{player.getInfo(playerId)['username']}}
            .teams__container__member--ranking
                .teams__container__member--ranking--global
                    span="#2"
                .teams__container__member--ranking--country
                    img(:src="player.getCountryFlag(playerId)" alt="country_flag")
                    span="#1"
    .teams__container--red
        .teams__container__member(v-for="playerId in teams.blue" style="background:url('https://osu.ppy.sh/images/headers/profile-covers/c4.jpg')")
            .teams__container__member--avatar
                img(:src="player.getAvatarUrl(playerId)" alt="user_avatar")
            .teams__container__member--nickname
                p {{player.getInfo(playerId)['username']}}
            .teams__container__member--ranking
                .teams__container__member--ranking--global
                    span="#2"
                .teams__container__member--ranking--country
                    img(:src="player.getCountryFlag(playerId)" alt="country_flag")
                    span="#1"
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';

@Component
export default class Teams extends Vue {
    @Prop() private teams!: Record<string, Array<number>>;

    loaded = false;

    player = {
      allPlayers: {},
      getInfo: (playerId: number) :Record<string, Record<string, string>> => this.player.allPlayers[playerId],
      getAvatarUrl: (playerId: number) :string => `https://a.ppy.sh/${playerId}`,
      getCountryFlag: (playerId: number) :string => `
        https://flagcdn.com/60x45/${
            (this.player.getInfo(playerId).country.code).toLowerCase()
            }.png`,
      getDbInfo: async (playerId: number) => {
        await axios({
          method: 'get',
          url: `http://localhost:3000/users/${playerId}`,
        })
          .then(({ data }: any) => {
            // push into object of objects, object key is playerId
            [this.player.allPlayers[playerId]] = data.result;
          });
      },
    }

    async created() {
      const playersToLoad = [...this.teams.blue, ...this.teams.red];

      playersToLoad.forEach(async (playerId) => {
        await this.player.getDbInfo(playerId);

        playersToLoad.shift();
        if (!playersToLoad.length) {
          this.loaded = true;
        }
      });

      return 0;
    }
}
</script>

<style lang="sass">
.teams__container
    display: flex
    flex-wrap: wrap
    flex-direction: row
    height: 100%
    &__member
        align-self: space-between
        height: 50px
        color: white
        font-weight: 800
        display: flex
        flex-direction: row
        align-items: center
        padding-left: 10px
        background-position: center center
        &--avatar
            max-height: 100%
            width: 45px
            flex-basis: 10%
            z-index: 1
        &--nickname
            flex-basis: 75%
            padding-left: 5px
            z-index: 1
        &--ranking
            display: flex
            flex-basis: 15%
            flex-direction: column
            align-self: center
            transform: scale(.8)
            z-index: 1
            &--global
                width: 100%
                text-align: left
                font-size: 1.5em
                margin-left: .5px
            &--country
                display: flex
                flex-direction: row
                align-items: center
                justify-content: flex-start
                *
                    flex-basis: 50%
                img
                    width: 100%
                span
                    text-align: center
    &--red, &--blue
        flex-basis: 50%
        display: flex
        flex-direction: column
        justify-content: flex-start
        background-blend-mode: blend
    &--red
        &:after
            position: absolute
            content: ''
            width: 50%
            height: 100%
            background: rgba(255,0,0,0.2)
            z-index: 0
    &--blue
        justify-content: flex-end
        &:after
            position: absolute
            content: ''
            width: 50%
            height: 100%
            background: rgba(0,0,255,0.2)
            z-index: 0
        flex-direction: column-reverse
        .teams__container__member
            flex-direction: row-reverse
            padding-left: unset
            padding-right: 10px
            &--nickname
                text-align: right
                padding-left: unset
                padding-right: 5px
            &--ranking
                &--global
                    text-align: right
                    margin-left: -2px
                &--country
                    flex-direction: row-reverse
</style>
