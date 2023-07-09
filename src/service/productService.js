import { productUrl } from "./BaseUrl";

const getProducts = async () => {
  try {
    const res = await fetch(productUrl);
    if (res.status == 200) {
      const data = res.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

const loadMoreProducts = async (limit, skip) => {
  try {
    const res = await fetch(`${productUrl}?limit=${limit}&skip=${skip}`);
    if (res.status == 200) {
      const data = res.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

const filterSearchProduct = async value => {
  try {
    const res = await fetch(`${productUrl}/search?q=${value}`);
    console.log("res---", res);
    if (res.status == 200) {
      const data = res.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export default {
  getProducts,
  loadMoreProducts,
  filterSearchProduct,
};
