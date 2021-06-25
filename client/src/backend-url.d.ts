import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $backendUrl: 'http://localhost:3000'
  }
}