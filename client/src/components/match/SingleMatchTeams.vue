<template lang="pug">
  .teams__container(v-if="teamsLoaded == true")
    .teams__container--red
        .teams__container__member(v-for="playerId in teams.red" :style="player.getCoverUrl(playerId)")
            .teams__container__member--avatar
                a(:href="player.getOsuProfileUrl(playerId)" target="_blank")
                    img(:src="player.getAvatarUrl(playerId)" alt="user_avatar")
            .teams__container__member--nickname
                a(:href="player.getOsuProfileUrl(playerId)" target="_blank")
                    p {{player.getInfo(playerId)['username']}}
            .teams__container__member--ranking
                .teams__container__member--ranking--global
                    img(:src="require(`@/assets/${player.getPlayMode(playerId)}.svg`)" alt="gamemode_icon")
                    span {{player.getGlobalRank(playerId)}}
                .teams__container__member--ranking--country
                    img(:src="player.getCountryFlag(playerId)" alt="country_flag")
                    span {{player.getCountryRank(playerId)}}
    .teams__container--blue
        .teams__container__member(v-for="playerId in teams.blue" :style="player.getCoverUrl(playerId)")
            .teams__container__member--avatar
                a(:href="player.getOsuProfileUrl(playerId)" target="_blank")
                    img(:src="player.getAvatarUrl(playerId)" alt="user_avatar")
            .teams__container__member--nickname
                a(:href="player.getOsuProfileUrl(playerId)" target="_blank")
                    p {{player.getInfo(playerId)['username']}}
            .teams__container__member--ranking
                .teams__container__member--ranking--global
                    span {{player.getGlobalRank(playerId)}}
                    img(:src="require(`@/assets/${player.getPlayMode(playerId)}.svg`)" alt="gamemode_icon")
                .teams__container__member--ranking--country
                    img(:src="player.getCountryFlag(playerId)" alt="country_flag")
                    span {{player.getCountryRank(playerId)}}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';

@Component
export default class Teams extends Vue {
    @Prop() private teams!: Record<string, Array<number>>;

    teamsLoaded = false;

    player = {
      allPlayers: {},
      getInfo: (playerId: number) :Record<string, Record<string, string>> => this.player.allPlayers[playerId],
      getAvatarUrl: (playerId: number) :string => `https://a.ppy.sh/${playerId}`,
      getCoverUrl: (playerId: number) :string => `
        background: linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) ), url('${this.player.getInfo(playerId).coverUrl}');
      `,
      getOsuProfileUrl: (playerId: number) :string => `https://osu.ppy.sh/u/${playerId}`,
      getGlobalRank: (playerId: number) :string => `#${this.player.getInfo(playerId).ranking.global}`,
      getCountryRank: (playerId: number) :string => `#${this.player.getInfo(playerId).ranking.country}`,
      getPlayMode: (playerId: number) :Record<string, string> => this.player.getInfo(playerId).playMode,
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

      // async like, just to collect info
      playersToLoad.forEach(async (playerId) => {
        await this.player.getDbInfo(playerId);

        playersToLoad.shift();
        if (!playersToLoad.length) {
          this.teamsLoaded = true;
        }
      });

      return 0;
    }
}
</script>

<style lang="sass">
.teams__container
    display: flex
    flex-wrap: nowrap
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
        z-index: 0
        background-size: cover !important
        a
            color: inherit !important
            text-decoration: none !important
        &--avatar
            max-height: 100%
            width: 45px
            flex-basis: 10%
            z-index: 1
        &--nickname
            flex-basis: 65%
            padding-left: 5px
            z-index: 5
            text-shadow: .5px 0px .5px black
            @media (max-width: 600px)
                p
                    padding: unset
                    margin: unset
        &--ranking
            display: flex
            flex-basis: 25%
            flex-direction: column
            align-self: center
            align-items: center
            transform: scale(.8)
            text-shadow: .5px 0px .5px black
            margin-top: 2px
            &--global
                width: 100%
                text-align: left
                font-size: 1.5em
                margin-left: .5px
                display: flex
                flex-direction: row
                justify-content: center
                padding-left: 5px
                img
                    height: 25px
                    display: block
                @media (max-width: 600px)
                    font-size: 1.2em
            &--country
                display: flex
                flex-direction: row
                align-items: center
                *
                    flex-basis: 50%
                img
                    width: 100%
                    height: 100%
                    max-height: 35px
                    padding: 5px
                span
                    text-align: left
                @media (max-width: 600px)
                    font-size: 1em
    &--red, &--blue
        flex-basis: 50%
        display: flex
        flex-direction: column
        justify-content: flex-start
    &--red
        .teams__container__member
            &--ranking
                z-index: 99999 !important
                @media (max-width: 600px)
                    align-self: center
                    margin-right: 5px
                &--global
                    img
                        padding-right: 3px
                &--country
                    align-self: flex-end
    &--blue
        justify-content: flex-end
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
                margin-right: 15px
                @media (max-width: 600px)
                    align-self: center
                    margin-left: 5px
                &--global
                    text-align: right
                    img
                        padding-left: 3px
                &--country
                    flex-direction: row-reverse
                    align-self: flex-start
                    img
                        max-height: 35px
                    span
                        text-align: right
                        z-index: 99999
</style>
