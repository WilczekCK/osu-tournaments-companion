<template lang="pug">
  .teams__container(v-if="loaded == true")
    .teams__container--blue
        .teams__container__member(v-for="userId in teams.red" style="background:url('https://osu.ppy.sh/images/headers/profile-covers/c4.jpg')")
            .teams__container__member--avatar
                img(:src="user.getAvatarUrl(userId)" alt="user_avatar")
            .teams__container__member--nickname
                p {{user.getInfo(userId)['username']}}
            .teams__container__member--ranking
                .teams__container__member--ranking--global
                    span="#2"
                .teams__container__member--ranking--country
                    img(:src="user.getCountryFlag(userId)" alt="country_flag")
                    span="#1"
    .teams__container--red
        .teams__container__member(v-for="userId in teams.blue" style="background:url('https://osu.ppy.sh/images/headers/profile-covers/c4.jpg')")
            .teams__container__member--avatar
                img(:src="user.getAvatarUrl(userId)" alt="user_avatar")
            .teams__container__member--nickname
                p {{user.getInfo(userId)['username']}}
            .teams__container__member--ranking
                .teams__container__member--ranking--global
                    span="#2"
                .teams__container__member--ranking--country
                    img(:src="user.getCountryFlag(userId)" alt="country_flag")
                    span="#1"
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';

@Component
export default class Teams extends Vue {
    @Prop() private teams!: Record<string, unknown>;

    usersInTournament = {};

    loaded = false;

    user = {
        getInfo: (userId: number) :Record<string, unknown> => this.usersInTournament[userId],
        getAvatarUrl: (userId: number) :string => `https://a.ppy.sh/${userId}`,
        getCountryFlag: (userId: number) :string => `
          https://flagcdn.com/60x45/
          ${ (this.user.getInfo(userId).country.code).toLowerCase() }.png`,
        getDbInfo: async (userId: number) => {
          await axios({
            method: 'get',
            url: `http://localhost:3000/users/${userId}`,
            })
          .then(({ data }: any) => {
            //push into object of objects, key is user_id
            this.usersInTournament[userId] = data.result[0];
          })
    }
    }

    async created() {
      const { blue, red } : {blue: any, red: any} = this.teams;
      const playersToLoad = [...blue, ...red];

      playersToLoad.forEach(async (playerId) => {
        await this.user.getDbInfo(playerId);

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
