<template>
  <div class="flex justify-center mt-24">
    <!-- Combo Box -->
    <div class="relative inline-block w-full max-w-xs">
      <input
        type="text"
        placeholder="Type here"
        class="input input-bordered w-full pr-10"
        v-model="searchTerm"
        @input="filterUsers"
        @focus="openDropdown"
        @blur="closeDropdown"
        @keydown.arrow-up.prevent="highlightPrevUser"
        @keydown.arrow-down.prevent="highlightNextUser"
      />
      <i
        class="bi bi-arrow-bar-down absolute top-1/2 right-3 transform -translate-y-1/2 text-blue-500 cursor-pointer text-lg hover:text-blue-700 shadow-lg"
      ></i>
      <ul
        v-show="isDropdownOpen && filteredData.length > 0"
        class="menu bg-base-200 w-full rounded-box shadow-lg mt-2 absolute z-10"
      >
        <span
          class="loading loading-spinner loading-sm text-blue-500"
          :class="isLoading ? '' : 'hidden'"
        ></span>
        <div class="max-h-56 overflow-y-scroll">
          <li>
            <a class="menu-title"><slot name="menuTitle" /></a>
          </li>
          <li
            v-for="(user, i) in filteredData"
            :key="i"
            :class="{ 'bg-blue-500 text-white': highlightedIndex === i }"
          >
            <slot name="item" :data="user" :onSelect="selectUser" />
          </li>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ["selected", "filteredData"],
  data() {
    return {
      isLoading: true,
      searchTerm: "",
      isDropdownOpen: false,
      highlightedIndex: -1,
    };
  },

  methods: {
    openDropdown() {
      this.isDropdownOpen = true;
    },
    closeDropdown() {
      this.isDropdownOpen = false;
    },
    selectUser(user) {
      this.$emit("selectedData", user);
      console.log(user);
      this.searchTerm = user;
      this.isDropdownOpen = false;
    },
    highlightPrevUser() {
      if (this.highlightedIndex > 0) {
        this.highlightedIndex--;
      }
    },
    highlightNextUser() {
      if (this.highlightedIndex < this.filteredUsers.length - 1) {
        this.highlightedIndex++;
      }
    },
    filterUsers() {
      this.highlightedIndex = -1;
    },
  },
};
</script>
