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
          <app-account
            v-for="(account, index) in accounts.all"
            :key="account._id"
            :index = index
            :account="account"
            :services= "services"
            :options="workHoursOptions"
          >
          </app-account>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
const swal = require("sweetalert");
import Account from "../layouts/Account.vue";
export default {
  components: {
    appAccount: Account,
  },
  data() {
    return {
      item: "Personnal Info",
      workHoursOptions: null,
      services: null,
      accounts: {
        all: [],
      },
    };
  },

  methods: {
      workHourenerator() {
      let work_hour_tab = [];
      for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute = minute + 5) {
          const hour_string =
            hour >= 10 ? hour.toString() : "0" + hour.toString();
          const minute_string =
            minute >= 10 ? minute.toString() : "0" + minute.toString();

          work_hour_tab.push(hour_string.concat(":", minute_string));
        }
      }

      this.workHoursOptions = work_hour_tab;
    },

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

    async getAllServices() {
      return await this.$http.get("/service").then((res) => {
        if (res.status === 200) return res.data;
        else return;
      });
    },
  },

  created() {
    this.workHourenerator();
    this.getAllServices().then((services) => {
      this.services = services;

      this.getAllAccounts()
        .then((accounts) => {
          accounts.forEach((account) => {
            this.getUserDetails(account.user_id).then((user_details) => {
              this.accounts.all.push({ account, user_details });
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
    });
  },
};
</script>
