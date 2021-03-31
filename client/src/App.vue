<template lang='pug'>
  #app
    #nav
      router-link(to="/")
        ="Home"
      router-link(to="/about")
        ="About"
      router-view
</template>

<style lang="stylus">
html
body
  background #535353
  margin 0
  padding 0

#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
</style>
