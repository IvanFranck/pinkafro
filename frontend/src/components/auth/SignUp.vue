<template>
  <form @submit.prevent="handleSignUp">
    <span class="text-secondary">Create an account</span>
    <div class="form-group">
      <label for="username">First name</label>
      <input type="text" name="first_name" id="first_name" v-model="user.first_name" />
    </div>
    <div class="form-group">
      <label for="username">Last name</label>
      <input type="text" name="last_name" id="last_name" v-model="user.last_name" />
    </div>
    <div class="form-group">
      <label for="username">Email</label>
      <input type="text" name="email" id="email" v-model="user.mail" />
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" name="password" id="password" v-model="user.password" />
    </div>
    <div class="form-group">
      <button class="button button__primary" type="submit">Create</button>
    </div>
    <div class="form-group">
      <span>Already have ann account ? <router-link to="/panel/log-in">Log In</router-link> </span>
    </div>
  </form>
</template>

<script>
const swal = require('sweetalert');
export default {
  data () {
    return {
      user: {
        mail: '',
        first_name: "",
        last_name: "",
        password: ''
      }
    };
  },
  methods: {
    async handleSignUp(){
      try {
        let response = await this.$http.post("/user/register", this.user);
        await console.log("register : " + response);
        let token = response.token.token;
        if (token) {
          localStorage.setItem("jwt", token);
          this.$router.push("/");
          swal("Success", "Registation was succesful", "success");
        }else{
          swal("Error", "Something went wrong", "error");
        }
      } catch (error) {
        let err = error.response;
        if(error.status == 409) swal("Error", "err.data.message", "error");
        else swal("Error", "erreur", "error");
      }
    }
  }
}
</script>