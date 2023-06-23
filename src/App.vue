<template>
  <div id="app">
    <ComboBox
      :selected="selected"
      :filteredData="filteredUserNames"
      @selectedData="selectedData"
    >
      <template v-slot:menuTitle>
        <div>Test Menu Title</div>
      </template>
      <template v-slot:item="slotProps">
        <div>
          {{ slotProps.data.value.name }} - {{ slotProps.data.value.surname }}
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
      filteredUserNames: [],
    };
  },

  methods: {
    selectedData(user) {
      this.currentData = user;
    },

    async filteredUsers() {
      try {
        const response = await fetch("http://localhost:3000/users");
        const data = await response.json();
        this.filteredUserNames = data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.filteredUsers();
  },
};
</script>
