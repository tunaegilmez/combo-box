<template>
  <div class="flex justify-center mt-24">
    <!-- Combo Box -->
    <div class="relative inline-block w-full max-w-xs">
      <input
        type="text"
        placeholder="Type here"
        class="input input-bordered w-full pr-10"
        v-model="searchTerm"
        @focus="openDropdown"
        @keyup="loadAnimate"
        @keydown.arrow-up.prevent="highlightPrevUser"
        @keydown.arrow-down.prevent="highlightNextUser"
      />
      <i
        class="bi bi-arrow-bar-down absolute top-1/2 right-3 transform -translate-y-1/2 text-blue-500 cursor-pointer text-lg hover:text-blue-700 shadow-lg"
      ></i>
      <ul
        v-show="isDropdownOpen && allData.length > 0"
        class="menu bg-base-200 w-full rounded-box shadow-lg mt-2 absolute z-10"
      >
        <div class="max-h-56 overflow-y-scroll">
          <li>
            <a class="menu-title">
              <slot name="menuTitle" />
            </a>
          </li>
          <span
            class="loading loading-spinner loading-sm text-blue-500"
            :class="isLoading ? '' : 'hidden'"
          ></span>
          <li
            v-for="(item, index) in filterSearchItems"
            :key="index"
            :class="{ 'bg-blue-500 text-white': highlightedIndex === index }"
            @click="selectItem(item)"
          >
            <slot name="item" :data="item" />
          </li>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ["allData", "searchFilterItem", "inputValue"],
  data() {
    return {
      isLoading: false,
      searchTerm: this.inputValue,
      isDropdownOpen: false,
      highlightedIndex: -1,
    };
  },

  computed: {
    filterSearchItems() {
      return this.allData.filter(item =>
        item.value[this.searchFilterItem]
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase())
      );
    },
  },

  methods: {
    openDropdown() {
      this.isDropdownOpen = true;
    },
    closeDropdown() {
      this.isDropdownOpen = false;
    },
    highlightPrevUser() {
      if (this.highlightedIndex > 0) {
        this.highlightedIndex--;
      }
    },
    highlightNextUser() {
      if (this.highlightedIndex < this.allData.length - 1) {
        this.highlightedIndex++;
      }
    },
    async selectItem(item) {
      await this.$emit("select-item", item);
      this.searchTerm = this.inputValue;
      this.isDropdownOpen = false;
    },
    loadAnimate() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    },
  },
};
</script>
