<template>
  <section class="account">
    <div class="account-header mb-4">
      <h1>Accounts</h1>
      <button type="button" class="btn button__secondary btn-primary">
        New account
      </button>
    </div>
    <div class="account-body">
      <table class="table table-hover">
        <thead>
          <tr class="table-head">
            <th scope="col">First Name :</th>
            <th scope="col">Last Name :</th>
            <th scope="col">Services :</th>
            <th scope="col">Status :</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="account in accounts.all" :key="account._id">
            <td>{{ account.user_details.first_name }}</td>
            <td>{{ account.user_details.last_name }}</td>
            <td>Manicure</td>
            <td>pending</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
const swal = require("sweetalert");

export default {
  data() {
    return {
      accounts: {
        all: [],
      },
    };
  },

  methods: {
    async getUserDetails(userId) {
      return await this.$http
        .get("/user/" + userId)
        .then((res) => {
          if (res.status == 200) return res.data;
          else return null;
        })
        .catch(() => {
          swal(
            "Error!",
            "Sommething went wrong while getting account details",
            "error"
          );
        });
    },
    async getAllAccounts() {
      return await this.$http.get("/account").then((res) => {
        if (res.status === 200) return res.data;
        else return;
      });
    },
  },
  created() {
    this.getAllAccounts()
      .then((accounts) => {
        accounts.forEach((account) => {
          this.getUserDetails(account.user_id).then((user_details) => {
            console.log("user details", user_details);
            this.accounts.all.push({account,user_details });
          });
        });
      })
      .catch(() => {
        swal(
          "Error!",
          "Sommething went wrong while getting services providers accounts",
          "error"
        );
      });
  },
};
</script>
