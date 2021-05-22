<template>
  <div class="w-100">
    <form
      @submit.prevent="handleServiceEdition"
      v-if="editing"
      class="row w-100"
    >
      <div class="col-10">
        <input
          type="text"
          class="form-control"
          id="inputService"
          placeholder="service name"
          v-model="service.name"
        />
      </div>
      <div class="col-2">
        <button type="submit" class="btn button__tertiary">
          {{ btn_text }}
        </button>
      </div>
    </form>

    <div class="w-100 d-flex justify-content-between" v-else>
      <span class=""> {{ data.name }} </span>
      <div>
        <svg
          width="36"
          height="40"
          viewBox="0 0 36 40"
          fill="none"
          @click="handleDeletingService"
          class="icon icon__service"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M31.8781 13.3943C32.2769 13.3943 32.6387 13.5683 32.9246 13.8623C33.1911 14.1763 33.3253 14.5663 33.2864 14.9783C33.2864 15.1142 32.2205 28.5941 31.6116 34.2681C31.2304 37.75 28.9858 39.864 25.6188 39.922C23.0298 39.98 20.4993 40 18.0076 40C15.3622 40 12.7753 39.98 10.2641 39.922C7.00996 39.844 4.76337 37.692 4.40158 34.2681C3.77525 28.5741 2.72879 15.1142 2.70934 14.9783C2.68989 14.5663 2.82215 14.1763 3.09058 13.8623C3.35511 13.5683 3.73635 13.3943 4.13704 13.3943H31.8781ZM22.1295 0C23.8976 0 25.477 1.23399 25.9341 2.99397L26.2609 4.45396C26.5254 5.64394 27.5563 6.48594 28.7428 6.48594H34.5742C35.3523 6.48594 36 7.13193 36 7.95392V8.71391C36 9.5159 35.3523 10.1819 34.5742 10.1819H1.42771C0.64772 10.1819 0 9.5159 0 8.71391V7.95392C0 7.13193 0.64772 6.48594 1.42771 6.48594H7.25913C8.4437 6.48594 9.47461 5.64394 9.74109 4.45596L10.0465 3.09197C10.5211 1.23399 12.083 0 13.8705 0H22.1295Z"
            fill="#8E99A4"
          />
        </svg>
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          @click="handleEditService"
          class="icon icon__service"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M33.9796 31.9065C35.0938 31.9065 36 32.8245 36 33.9533C36 35.0841 35.0938 36 33.9796 36H22.5594C21.4452 36 20.5389 35.0841 20.5389 33.9533C20.5389 32.8245 21.4452 31.9065 22.5594 31.9065H33.9796ZM26.0597 1.39813L29.0097 3.74157C30.2195 4.68754 31.0259 5.93451 31.3018 7.24598C31.6202 8.68859 31.2806 10.1054 30.3256 11.3309L12.7528 34.0558C11.9463 35.0878 10.7578 35.6683 9.48443 35.6898L2.48079 35.7758C2.09877 35.7758 1.78043 35.5178 1.69553 35.1523L0.103797 28.2509C-0.172104 26.9825 0.103797 25.671 0.910277 24.6605L13.3683 8.53595C13.5805 8.27795 13.9625 8.2371 14.2172 8.42845L19.4593 12.5993C19.7989 12.8788 20.2658 13.0293 20.7539 12.9648C21.7939 12.8358 22.4942 11.8899 22.3881 10.8794C22.3244 10.3634 22.0698 9.93341 21.7302 9.61092C21.6241 9.52492 16.6366 5.52602 16.6366 5.52602C16.3183 5.26803 16.2546 4.79504 16.5093 4.4747L18.483 1.91411C20.3082 -0.429327 23.4917 -0.644321 26.0597 1.39813Z"
            fill="#8E99A4"
          />
        </svg>
      </div>
    </div>
  </div>
</template>


<script>
const swal = require("sweetalert");

export default {
  data() {
    return {
      editing: false,
      btn_text: "Annuler",
      service: {
        name: "",
      },
    };
  },
  props: {
    data: Object,
    index: Number,
  },
  methods: {
    handleEditService() {
      this.editing = true;
    },
    async handleDeletingService() {
      const id = this.data._id;
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this service !",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.$http
            .delete("/service/" + id)
            .then((response) => {
              this.$emit("serviceWasDeleted");
              swal("Service deleted successfully !", {
                icon: "success",
              });
            })
            .catch((err) => {
              swal("Error !", "Sommething went wrong while deleting", "error");
            });
        }
      });
    },
    async handleServiceEdition() {
      const id = this.data._id;
      if (this.btn_text == "Annuler") this.editing = false;
      else {
        const response = await this.$http.put("/service/" + id, this.service);
        if (response.status == 200)
          this.$emit("serviceWasEdited", response.data.data.name);
        this.service.name = "";
        this.editing = false;
      }
    },
  },

  watch: {
    "service.name": function (newName, oldName) {
      if (newName.trim() != "") this.btn_text = "Edit service";
      else this.btn_text = "Annuler";
    },
  },

  mounted() {
    console.log("mounted");
  },
};
</script>