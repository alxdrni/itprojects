<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  beforeMount () {
    this.loadNotesFromLocalStorage()
  },
  methods: {
    ...mapActions([
      'loadNotesFromLocalStorage'
    ])
  }
}
</script>

<style>
.app {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: calc(100vh - 60px);
}
</style>
