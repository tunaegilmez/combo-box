<template>
  <div id="app" class="flex justify-center mt-24">
    <!-- Combo Box -->
    <div class="relative inline-block w-full max-w-xs">
      <input
        type="text"
        placeholder="Type here"
        class="input input-bordered w-full pr-10"
        @focus="showMenu"
        @blur="hideMenu"
      />
      <i
        @click="showMenu"
        class="bi bi-arrow-bar-down absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer text-lg hover:text-blue-500"
      ></i>
      <ul
        v-show="isMenuOpen"
        class="menu bg-base-200 w-full rounded-box shadow-lg mt-2 absolute z-10"
      >
        <!-- TO-DO: ul içine tailwind'ten "hidden" özelliği ver :class olarak -->
        <div class="h-56 overflow-y-scroll">
          <li><a class="menu-title">Select a user</a></li>
          <li v-for="(user, i) in data" :key="i">
            <a>{{ user }}</a>
          </li>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      data: [
        "Ahmet S.",
        "Tuna",
        "İbrahim",
        "Ahmet",
        "Malik",
        "Mehmet",
        "Batu",
        "Suna",
        "Emine",
        "Soner",
      ],
      isMenuOpen: false,
    };
  },
  methods: {
    showMenu() {
      this.isMenuOpen = true;
    },
    hideMenu() {
      this.isMenuOpen = false;
    },
  },
};
</script>
