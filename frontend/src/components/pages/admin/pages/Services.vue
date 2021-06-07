<template>
  <section class="services">
    <h1>Services</h1>
    <form @submit.prevent="handleNewServiceCreation" class="row">
      <div class="col-10">
        <input
          type="text"
          class="form-control"
          id="inputService"
          placeholder="New service"
          v-model="service.name"
        />
      </div>
      <div class="col-2">
        <button type="submit" class="btn button__secondary">Add service</button>
      </div>
    </form>

    <div class="mt-5 service-list">
      <ul class="list-group list-group-flush">
        <!-- loop on all services get from DB -->
        <li
          v-for="(data, index) in service.all"
          :key="data.__id"
          class="pb-6 list-group-item d-flex justify-content-between"
          aria-disabled="true"
        >
          <!-- 
            app-service props = index, and data  
            @.. = child (/layouts/Service.vue) event listenner 
          -->
          <app-service
            @serviceWasDeleted="service.all.splice(index, 1)"
            @serviceWasEdited="service.all[index].name = $event"
            :index="index"
            :data="data"
          ></app-service>
        </li>
      </ul>
    </div>
  </section>
</template>
<script>
const swal = require("sweetalert");
import service from "../layouts/Service";
export default {
  components: {
    appService: service,
  },
  data() {
    return {
      service: {
        name: "",
        all: [],
      },
      message: "",
    };
  },
  methods: {
    async handleNewServiceCreation() {
      this.$http
        .post("/service", this.service)
        .then((response) => {
          this.service.all.unshift(response.data.data);
          swal("Service added successfully !");
        })
        .catch(err => {
          swal("Error!", "Sommething went wrong while creating", "error");
        });
      this.service.name = "";
    },

    async getAllServices() {
      const response = await this.$http.get("/service");
      if (response.status === 200)
        this.service.all = response.data.reverse();
      else message = "Problem with server connection ! Please reload te page";
    },
  },
  created() {
    this.getAllServices();
  },
};
</script>
