<template>
  <div>
    <ComboBox
      :allData="searchedData.length > 0 ? searchedData : data"
      @select-item="selectItem"
      :inputValue="inputValue"
      @load-more="loadMore"
      @filter-search-items="filterSearchProduct"
    >
      <template v-slot:menutitle>
        <div>Proucts</div>
      </template>
      <template v-slot:item="slotProps">
        <div>
          {{ slotProps.data.id }} - {{ slotProps.data.title }} -
          {{ slotProps.data.price }} $
        </div>
      </template>
    </ComboBox>
  </div>
</template>
<script>
import ComboBox from "../components/ComboBox.vue";
import productService from "../service/productService.js";
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
    async getProducts() {
      try {
        const response = await productService.getProducts();
        this.data = response.products;
      } catch (error) {
        console.log(error);
      }
    },

    async loadMore() {
      this.limit += 10;

      try {
        const res = await productService.loadMoreProducts(
          this.limit,
          this.skip
        );
        this.moreData = res.products;
        this.data = [...this.moreData];
      } catch (error) {
        console.log(error);
      }
    },

    async filterSearchProduct(searchTerm) {
      try {
        const response = await productService.filterSearchProduct(searchTerm);

        this.searchedData = response.products;
      } catch (error) {
        console.log(error);
      }
    },

    selectItem(item) {
      this.inputValue = `${item.title} - ${item.price} $`;
    },
  },

  mounted() {
    this.getProducts();
  },
};
</script>
