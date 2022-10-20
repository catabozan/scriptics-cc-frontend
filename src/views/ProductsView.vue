<template>
  <ProductCard
    v-for="product in products"
    :key="product.id"
    :product="product"
  />
</template>

<script>
import ProductCard from "@/components/ProductCard.vue";

export default {
  name: "ProductsView",
  components: {
    ProductCard,
  },
  created() {
    this.$http.get("/products").then((res) => {
      console.log(res);
      this.products = res.data.data;
      this.pagination = res.data.links;
    });
  },
  data() {
    return {
      products: [],
      pagination: {},
    };
  },
};
</script>
