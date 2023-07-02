<template>
  <div id="app">
    <ComboBox
      :allData="data"
      :searchFilterItem="searchForName"
      @select-item="selectItem"
      :inputValue="inputValue"
    >
      <template v-slot:menuTitle>
        <div>Users</div>
      </template>
      <template v-slot:item="slotProps">
        <div>
          {{ slotProps.data.key }} - {{ slotProps.data.value.name }} -
          {{ slotProps.data.value.surname }}
        </div>
      </template>
    </ComboBox>

    <!-- Test Combo-Box -->
    <div>
      <ThisTest></ThisTest>
    </div>
  </div>
</template>

<script>
import ComboBox from "./components/ComboBox.vue";
import ThisTest from "./components/ThisTest.vue";
export default {
  components: {
    ComboBox,
    ThisTest,
  },
  data() {
    return {
      data: [],
      searchForName: "name",
      inputValue: "",
    };
  },

  methods: {
    async getUsers() {
      try {
        const response = await fetch("http://localhost:3000/users");
        this.data = await response.json();
      } catch (error) {
        console.log(error);
      }
    },

    selectItem(item) {
      this.inputValue = `${item.value.name} - ${item.value.surname}`;
    },
  },
  mounted() {
    this.getUsers();
  },
};
</script>
