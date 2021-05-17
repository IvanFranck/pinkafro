<template>
  <div id="app">
    <app-header></app-header>
    <main class="container">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Header from './components/Header'

export default {
  name: 'App',
  components: {
    appHeader: Header
  }
}
</script>

<style>
@import './assets/style.css';
</style>
