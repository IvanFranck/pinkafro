<template>
  <tr>
    <td>{{ account.user_details.first_name }}</td>
    <td>{{ account.user_details.last_name }}</td>
    <td>Manicure</td>
    <td>pending</td>
    <td>
      <!-- Button trigger modal -->
      <span
        data-bs-toggle="modal"
        :data-bs-target="'#staticBackdrop'+index"
        class="icon icon__square icon__hidden"
      >
        <i class="fas fa-pencil-alt"></i>
      </span>
      <span class="px-5"><i class="fas fa-chevron-right"></i></span>
    </td>

    <!-- Modal -->
    <div
      class="modal"
      :id="'staticBackdrop'+index"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-title">
              <h2 id="staticBackdropLabel">Edit account</h2>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <ul class="horizontal-menu">
              <li
                @click="toogleIsCliked_PersonnalInfo"
                :class="
                  this.isClikedItem.personnal_info ? 'item active' : 'item'
                "
              >
                <a> Personnal Info </a>
              </li>
              <li
                @click="toogleIsCliked_Services"
                :class="this.isClikedItem.services ? 'item active' : 'item'"
              >
                <a> Services </a>
              </li>
              <li
                @click="toogleIsCliked_WorkingHours"
                :class="
                  this.isClikedItem.working_hours ? 'item active' : 'item'
                "
              >
                <a>Working Hours</a>
              </li>
            </ul>
          </div>
          <div class="modal-body">
            <form class="row modal-body-form" @submit.prevent="" action="">
              <section
                class="personnal-info row"
                v-if="this.isClikedItem.personnal_info"
              >
                <div class="col-md-12">
                  <label class="form-label">First name</label>
                  <input type="text" class="form-control" required />
                </div>
                <div class="pt-4 col-md-12">
                  <label class="form-label">Last name</label>
                  <input type="text" class="form-control" required />
                </div>
                <div class="pt-4 col-md-6">
                  <label class="form-label">Email</label>
                  <input type="email" class="form-control" required />
                </div>
                <div class="pt-4 col-md-6">
                  <label class="form-label">Phone Number</label>
                  <input type="number" class="form-control" required />
                </div>
              </section>

              <section class="services" v-else-if="this.isClikedItem.services">
                <div
                  v-for="service in services"
                  :key="service._id"
                  class="input-group mb-5 services-body"
                >
                  <div class="input-group-text">
                    <input
                      class="form-check-input mt-0"
                      type="radio"
                      value=""
                      aria-label="Checkbox for following text input"
                    />
                    <span class="ml-4">{{ service.name }}</span>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    aria-label="Text input with checkbox"
                    placeholder="enter the service's price"
                  />
                  <span class="input-group-text">FCFA</span>
                </div>
              </section>

              <section
                class="working-hours"
                v-else-if="this.isClikedItem.working_hours"
              >
                <div class="working-hours_content">
                  <div
                    class="working-hours_day mb-5"
                    v-for="(day, index) in this.days"
                    :key="index"
                  >
                    <div class="day">
                      <span class="day_text">{{ day }}</span>
                      <span
                        class="day_icon"
                        type="button"
                        data-bs-toggle="collapse"
                        :data-bs-target="'#collapseExample' + index"
                        aria-expanded="false"
                        aria-controls="collapseExample"
                        ><i class="fas fa-plus"></i
                      ></span>
                    </div>
                    <div class="hours">
                      <div class="collapse" :id="'collapseExample' + index">
                        <div class="card card-body">
                          <form class="my-3">
                            <span>Work Hour</span>
                            <div class="row-select mt-3">
                              <div class="select">
                                <span><i class="far fa-clock"></i></span>
                                <select class="form-select form-select-lg">
                                  <option selected>
                                    
                                  </option>
                                  <option
                                    v-for="(option, index) in options"
                                    :key="index"
                                    :value="'option'"
                                  >
                                    {{option}}
                                  </option>
                                </select>
                              </div>
                              <div class="select">
                                <span><i class="far fa-clock"></i></span>
                                <select class="form-select form-select-lg">
                                  <option selected>
                                    
                                  </option>
                                  <option
                                    v-for="(option, index) in options"
                                    :key="index"
                                    :value="'option'"
                                  >
                                    {{option}}
                                  </option>
                                </select>
                              </div>
                            </div>
                            <div class="row-btn mt-3">
                              <button
                                type="submit"
                                class="btn btn-primary btn-lg"
                              >
                                Save
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">Understood</button>
          </div>
        </div>
      </div>
    </div>
  </tr>
</template>

<script>
const swal = require("sweetalert");
export default {
  data() {
    return {
      days: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      workHoursOptions: null,
      isClikedItem: {
        personnal_info: true,
        services: false,
        working_hours: false,
      },
    };
  },

  props: {
    index: Number,
    options: Array,
    account: Object,
    services: Array,
  },

  methods: {
    

    toogleIsCliked_PersonnalInfo() {
      this.isClikedItem.personnal_info = !this.isClikedItem.personnal_info;
      this.isClikedItem.services = false;
      this.isClikedItem.working_hours = false;
    },

    toogleIsCliked_Services() {
      this.isClikedItem.services = !this.isClikedItem.services;
      this.isClikedItem.personnal_info = false;
      this.isClikedItem.working_hours = false;
    },

    toogleIsCliked_WorkingHours() {
      this.isClikedItem.working_hours = !this.isClikedItem.working_hours;
      this.isClikedItem.personnal_info = false;
      this.isClikedItem.services = false;
    },
  },
 
};
</script>