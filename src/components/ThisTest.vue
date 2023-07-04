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
        const response = await fetch(
          `http://localhost:3001/employees?_limit=${this.limit}&_skip=${this.skip}`
        );
        this.data = await response.json();
      } catch (error) {
        console.log(error);
      }
    },

    async loadMore(e) {
      this.limit += 10;
      try {
        console.log(e);
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
