<template>
  <div>
    <h1 v-if="this.$route.path === '/panels/customer'">Customer</h1>
    <h1 v-if="this.$route.path === '/panels/service-provider'">Service Provider Panel</h1>
    <section class="register-form">
      <router-view/>
    </section>
  </div>
</template>
<script>

</script>