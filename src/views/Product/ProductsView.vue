<template>
  <div v-if="user?.admin" class="flex justify-center my-8">
    <router-link to="products/new">
      <el-button type="primary">+ Add New Product</el-button>
    </router-link>
  </div>
  <div class="flex justify-center my-8">
    <el-button-group>
      <router-link v-if="currentPage > 1" :to="'?page=' + (currentPage - 1)">
        <el-button type="primary"> &lt; Previous Page</el-button>
      </router-link>
      <router-link :to="'?page=' + (currentPage + 1)">
        <el-button type="primary"> Next Page > </el-button>
      </router-link>
    </el-button-group>
  </div>
  <div class="flex flex-wrap justify-center">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
      @deleted="removeProduct(product.id)"
    />
  </div>
  <div class="flex justify-center my-8">
    <el-button-group>
      <router-link v-if="currentPage > 1" :to="'?page=' + (currentPage - 1)">
        <el-button type="primary"> &lt; Previous Page</el-button>
      </router-link>
      <router-link :to="'?page=' + (currentPage + 1)">
        <el-button type="primary"> Next Page > </el-button>
      </router-link>
    </el-button-group>
  </div>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue";
import { toInteger } from "lodash";
import { mapGetters } from "vuex";

export default {
  name: "ProductsView",
  components: {
    ProductCard,
  },
  mounted() {
    this.fetchProducts();
  },
  beforeUpdate() {
    let page = this.$route.query.page;
    this.currentPage = page ? toInteger(page) : 1;
  },
  data() {
    return {
      products: [],
      pagination: {},
      currentPage: 1,
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    removeProduct(id) {
      this.products = this.products.filter((product) => product.id !== id);
    },
    fetchProducts() {
      this.$http
        .get("api/products" + "?page=" + this.currentPage ?? "1")
        .then((res) => {
          this.products = res.data.data;
          this.pagination = res.data.links;
        });
    },
  },
  watch: {
    currentPage() {
      this.fetchProducts();
    },
  },
};
</script>
