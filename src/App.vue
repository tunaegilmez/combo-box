<template>
  <div id="app">
    <ComboBox
      :allData="data"
      :searchFilterItem="searchForName"
      @select-item="selectItem"
      :inputValue="inputValue"
      @load-more="loadMore"
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
    <!-- <div>
      <ThisTest></ThisTest>
    </div> -->
  </div>
</template>

<script>
import ComboBox from "./components/ComboBox.vue";
// import ThisTest from "./components/ThisTest.vue";
import userService from "./service/userService.js";
export default {
  components: {
    ComboBox,
    // ThisTest,
  },
  data() {
    return {
      data: [],
      moreData: [],
      searchForName: "name",
      inputValue: "",
      limit: 10,
      skip: 0,
    };
  },

  methods: {
    async getUsers() {
      try {
        const response = await userService.getUser();
        this.data = response.users.users;
      } catch (error) {
        console.log(error);
      }
    },

    async loadMore() {
      this.limit += 10;
      try {
        const response = await userService.loadMoreUsers(this.limit, this.skip);
        this.moreData = response.users.users;
        this.data = [...this.moreData];
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
