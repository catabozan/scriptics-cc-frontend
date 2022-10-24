<template>
  <div class="flex flex-wrap justify-center">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </div>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue";

export default {
  name: "ProductsView",
  components: {
    ProductCard,
  },
  created() {
    this.$http.get("api/products").then((res) => {
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
