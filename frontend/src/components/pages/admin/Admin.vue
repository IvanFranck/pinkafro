<template>
  <div class="container-inner">
      <app-sidebar></app-sidebar>
      <div class="main ">
          <router-view></router-view>
      </div>
  </div>
</template>

<script>
import SideBar from './layouts/SideBar'

export default ({
    components: {
        appSidebar: SideBar
    }
})
</script>
