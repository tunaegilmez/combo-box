<template>
  <div id="app">
    <ComboBox :selected="selected" :allData="data">
      <template v-slot:menuTitle>
        <div>Test Menu Title</div>
      </template>
      <template v-slot:item="slotProps">
        <div>
          {{ slotProps.data.key }} - {{ slotProps.data.value.name }} -
          {{ slotProps.data.value.surname }}
        </div>
      </template>
    </ComboBox>
  </div>
</template>

<script>
import ComboBox from "./components/ComboBox.vue";
export default {
  components: {
    ComboBox,
  },
  data() {
    return {
      selected: 1,
      currentData: "",
      data: [],
    };
  },

  methods: {
    selectedData(user) {
      this.selected = user;
    },

    async getUsers() {
      try {
        const response = await fetch("http://localhost:3000/users");
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
