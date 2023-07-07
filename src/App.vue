<template>
  <div id="app">
    <ComboBox
      :allData="searchedData.length > 0 ? searchedData : data"
      @select-item="selectItem"
      :inputValue="inputValue"
      @load-more="loadMore"
      @filter-search-items="filterSearchItems"
    >
      <template v-slot:menuTitle>
        <div>Users</div>
      </template>
      <template v-slot:item="slotProps">
        <div>
          {{ slotProps.data.id }} - {{ slotProps.data.firstName }} -
          {{ slotProps.data.lastName }}
        </div>
      </template>
    </ComboBox>
  </div>
</template>

<script>
import ComboBox from "./components/ComboBox.vue";
import userService from "./service/userService.js";

export default {
  components: {
    ComboBox,
  },
  data() {
    return {
      data: [],
      moreData: [],
      searchedData: [],
      inputValue: "",
      limit: 10,
      skip: 0,
    };
  },

  methods: {
    async getUsers() {
      try {
        const response = await userService.getUser();

        this.data = response.users;
      } catch (error) {
        console.log(error);
      }
    },

    async loadMore() {
      this.limit += 10;
      try {
        const response = await userService.loadMoreUsers(this.limit, this.skip);
        this.moreData = response.users;
        this.data = [...this.moreData];
      } catch (error) {
        console.log(error);
      }
    },

    async filterSearchItems(searchTerm) {
      try {
        const response = await userService.filterSearchItem(
          "firstName",
          searchTerm
        );

        this.searchedData = response.users;
      } catch (error) {
        console.log(error);
      }
    },

    selectItem(item) {
      this.inputValue = `${item.firstName} - ${item.lastName}`;
    },
  },
  mounted() {
    this.getUsers();
  },
};
</script>
