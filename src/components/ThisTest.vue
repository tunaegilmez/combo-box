<template>
  <div>
    <ComboBox
      :allData="data"
      :searchFilterItem="searchForDepartment"
      @select-item="selectItem"
      :inputValue="inputValue"
      @load-more="loadMore"
    >
      <template v-slot:menuTitle>
        <div>Employee</div>
      </template>
      <template v-slot:item="slotProps">
        <div>
          {{ slotProps.data.value.employee_id }} -
          {{ slotProps.data.value.department }}
        </div>
      </template>
    </ComboBox>
  </div>
</template>
<script>
import ComboBox from "./ComboBox.vue";

import emploeeService from "../service/employeeService.js";

export default {
  components: {
    ComboBox,
  },
  data() {
    return {
      data: [],
      moreData: [],
      searchForDepartment: "department",
      inputValue: "",
      limit: 10,
      skip: 0,
    };
  },
  methods: {
    async getUsers() {
      try {
        const response = await emploeeService.getEmployees();
        this.data = response;
        console.log(this.data);
      } catch (error) {
        console.log(error);
      }
    },

    async loadMore() {
      this.limit += 10;
      try {
        const response = await fetch(
          `http://localhost:3001/employees?_limit=${this.limit}&_skip=${this.skip}`
        );
        this.moreData = await response.json();
        this.data = [...this.moreData];
      } catch (error) {
        console.log(error);
      }
    },

    selectItem(item) {
      this.inputValue = `${item.value.employee_id} - ${item.value.department}`;
    },
  },
  mounted() {
    this.getUsers();
  },
};
</script>
