<template>
  <div v-if="user?.admin" class="flex justify-center my-8">
    <router-link to="products/new">
      <el-button type="primary">+ Add New Product</el-button>
    </router-link>
  </div>
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
import { mapGetters } from "vuex";

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
  computed: {
    ...mapGetters(["user"]),
  },
};
</script>
