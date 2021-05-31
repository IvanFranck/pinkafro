<template>
  
</template>

<script>
const swal = require("sweetalert");
export default {
  data() {
    return {
      user_data: null,
    };
  },

  methods: {
    async getServicesProviderAccount(user_id) {
      await this.$http
        .get("/user/" + user_id)
        .then((res) => {
          if ((res.status = 200)) this.user_data = res.data;
        })
        .catch((err) => {
          swal(
            "Error !",
            "Sommething went wrong while getting account details",
            "error"
          );
        });
    },
  },

  created() {},
};
</script>