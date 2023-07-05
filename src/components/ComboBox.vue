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
        @keydown.arrow-up.prevent="highlightPrevItem"
        @keydown.arrow-down.prevent="highlightNextItem"
      />
      <i
        @click="openDropdown"
        class="bi bi-arrow-bar-down absolute top-1/2 right-3 transform -translate-y-1/2 text-blue-500 cursor-pointer text-lg hover:text-blue-700 shadow-lg"
      ></i>
      <ul
        v-show="isDropdownOpen && allData.length > 0"
        class="menu bg-base-200 overflow-y-scroll w-full rounded-box shadow-lg mt-2 absolute z-10"
        @scroll="loadMoreItem"
      >
        <div class="max-h-56">
          <li>
            <a class="menu-title">
              <slot name="menuTitle" />
            </a>
          </li>
          <div v-if="isLoading">
            <span
              class="loading loading-spinner loading-sm text-blue-500"
            ></span>
          </div>
          <div v-else>
            <li
              v-for="(item, index) in filterSearchItems"
              :key="index"
              :class="{ 'bg-blue-500 text-white': highlightedIndex === index }"
              @click="selectItem(item)"
            >
              <slot name="item" :data="item" />
            </li>
          </div>
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
        item[this.searchFilterItem]
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase())
      );
    },
  },

  methods: {
    openDropdown() {
      this.isDropdownOpen = true;
    },
    highlightPrevItem() {
      if (this.highlightedIndex > 0) {
        this.highlightedIndex--;
      } else {
        this.highlightedIndex = this.allData.length - 1;
      }
    },
    highlightNextItem() {
      if (this.highlightedIndex < this.allData.length - 1) {
        this.highlightedIndex++;
      } else {
        this.highlightedIndex = 0;
      }
    },
    async selectItem(item) {
      await this.$emit("select-item", item);
      this.searchTerm = this.inputValue;
      this.isDropdownOpen = false;
    },

    async loadMoreItem(e) {
      const { scrollTop, offsetHeight, scrollHeight } = e.target;

      if (scrollTop + offsetHeight >= scrollHeight) {
        this.$emit("load-more");
      }
    },
  },
};
</script>
