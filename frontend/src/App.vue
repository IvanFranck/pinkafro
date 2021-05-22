<template>
  <div id="app" :class="adminBackgroundColor()">
    <app-header></app-header>
    <main class="contain">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Header from './components/Header'

export default {
  name: 'App',
  methods: {
    adminBackgroundColor() {
      return this.$route.path.includes('/admin') ? "admin-app" : ""
    }
  },
  components: {
    appHeader: Header
  }
}
</script>

<style>
@import './assets/style.css';
</style>
