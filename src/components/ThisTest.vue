<template>
  <div>
    <ComboBox :allData="data" :searchFilterItem="searchForDepartment">
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
export default {
  components: {
    ComboBox,
  },
  data() {
    return {
      data: [],
      searchForDepartment: "department",
    };
  },
  methods: {
    async getUsers() {
      try {
        const response = await fetch("http://localhost:3001/employees");
        this.data = await response.json();
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getUsers();
  },
};
</script>
