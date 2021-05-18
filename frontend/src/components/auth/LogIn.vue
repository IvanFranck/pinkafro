<template>
  <form @submit.prevent="handleLogIn">
    <span class="text-secondary">Sign In</span>
    <div class="form-group">
      <label for="username">Email</label>
      <input type="text" name="usernanme" id="username" v-model="login.mail"/>
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" name="password" id="password" v-model="login.password"/>
    </div>
    <div class="form-group">
      <button class="button button__primary" type="submit">Sign In</button>
    </div>
    <div class="form-group">
      <span><p>Don't have an account ?</p> <router-link :to="this.$route.path+'/sign-up'">Create one</router-link></span>
    </div>
  </form>
</template>

<script>
const swal = require('sweetalert')
export default {
  data() {
    return {
      login: {
        mail: "",
        password: ""
      }
    };
  },
  methods: {
    async handleLogIn() {
      try {
        let response = await this.$http.post("/user/login", this.login);
        let token = response.data.token;
        localStorage.setItem("jwt", token);
        if(token){
          swal('Succes', "Login successfully !", "success")
        }
      } catch (err) {
        swal("Error", "Something Went Wrong", "error");
        console.log("ERROR !",err.response);
      }
    }
  }
}
</script>