<template lang="pug">
  .teams__container(v-if="teamsLoaded == true")
    .teams__container
        .teams__container__member(style="color:black" v-for="player in allPlayers"
        :style="`background: linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) ), url('${player.coverUrl}');`")
            .teams__container__member--avatar
                a(:href="`https://osu.ppy.sh/u/${player.id}`" target="_blank")
                    img(:src="`https://a.ppy.sh/${player.id}`" alt="user_avatar")
            .teams__container__member--nickname
                a(:href="`https://osu.ppy.sh/u/${player.id}`" target="_blank")
                    p {{ player.username }}
            .teams__container__member--ranking
                .teams__container__member--ranking--global
                    img(:src="require(`@/assets/${player.playMode}.svg`)" alt="gamemode_icon")
                    span='#'
                        .
                            {{player.ranking.global}}
                .teams__container__member--ranking--country
                    img(:src="`https://www.countryflags.io/${player.country.code}/flat/64.png`" alt="country_flag")
                    span='#'
                        .
                            {{player.ranking.country}}

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';
import _ from 'underscore';

@Component
export default class Qualifiers extends Vue {
    @Prop() private teams!: Record<string, Array<number>>;

    teamsLoaded = false;

    allPlayers : Array<number | never> = [];

    player = {
      getDbInfo: async (playerId: number) : Promise<void> => {
        await axios({
          method: 'get',
          url: `${Vue.prototype.$backendUrl}/users/${playerId}`,
        })
          .then(({ data }) => {
            // push into array, full info about players by their teams
            if (!data.result) {
              //
            } else if (this.teams.red.includes(playerId)) {
              this.allPlayers.push(data.result[0]);
            } else {
              this.allPlayers.push(data.result[0]);
            }
          });
      },
    }

    async created() :Promise<void> {
      let playersToLoad = [...this.teams.blue, ...this.teams.red];
      playersToLoad = _.uniq(playersToLoad);
      // async like, just to collect info
      playersToLoad.forEach(async (playerId) => {
        await this.player.getDbInfo(playerId);

        playersToLoad.shift();
        if (!playersToLoad.length) {
          this.teamsLoaded = true;
        }
      });
    }
}
</script>

<style lang="sass">
.teams__container
    display: flex
    flex-wrap: nowrap
    flex-direction: column
    height: 100%
    &__member
        align-self: space-between
        height: 65px
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
            color: white !important
            text-decoration: none !important
        @media (max-width: 600px) and (min-width: 400px)
            justify-content: space-around
        &--avatar
            max-height: 100%
            flex-basis: 6%
            z-index: 1
            img
        &--nickname
            flex-basis: 70%
            padding-left: 5px
            z-index: 5
            text-shadow: .5px 0px .5px black
            @media (max-width: 600px)
                p
                    padding: unset
                    margin: unset
                flex-basis: unset
        &--ranking
            display: flex
            flex-basis: 25%
            flex-direction: column
            align-self: center
            align-items: center
            transform: scale(.8)
            text-shadow: .5px 0px .5px black
            margin-top: 5px
            color: white
            @media (max-width: 400px)
                display: none
            &--global
                width: 100%
                min-width: 150px
                text-align: left
                font-size: 1.5em
                margin-left: .5px
                display: flex
                flex-direction: row
                justify-content: flex-end
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
                justify-content: flex-end
                min-width: 150px
                margin-top: -5px
                img
                    max-height: 35px
                    padding: 5px
                span
                    text-align: left
                @media (max-width: 600px)
                    font-size: 1em
</style>
