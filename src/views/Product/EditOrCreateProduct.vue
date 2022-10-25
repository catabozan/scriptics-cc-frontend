<template>
  <div class="flex flex-col m-auto p-12">
    <form @submit.prevent="updateOrCreate">
      <el-form-item class="w-1/3" label="Title">
        <el-input v-model="product.title" />
      </el-form-item>
      <el-form-item class="w-1/3" label="Description">
        <el-input type="textarea" v-model="product.description" />
      </el-form-item>
      <el-form-item class="w-1/3" label="Price">
        <el-input-number
          :min="1"
          :precision="2"
          :step="0.01"
          step-strictly
          v-model="product.price"
        />
      </el-form-item>
      <el-form-item class="w-1/3" label="Stock">
        <el-input-number
          :min="0"
          :step="1"
          step-strictly
          v-model="product.stock"
        />
      </el-form-item>

      <button type="submit" class="p-4 bg-cyan-100 rounded">
        {{ updateAction ? "Update" : "Create" }}
      </button>
    </form>
    <ErrorList :errors="errors" />
  </div>
</template>

<script>
import ErrorList from "@/components/ErrorList.vue";

export default {
  components: {
    ErrorList,
  },
  created() {
    if (this.$route.params.productId === "new") {
      this.updateAction = false;
      return;
    }

    this.$http
      .get("api/products/" + this.$route.params.productId)
      .then((res) => {
        this.product = res.data.data;
        this.product.price = this.product.price / 100;
        this.updateAction = true;
      });
  },
  data() {
    return {
      product: {
        title: "",
        description: "",
        price: null,
        stock: null,
      },
      errors: {},
      updateAction: false,
    };
  },
  methods: {
    updateOrCreate() {
      const httpMethod = this.updateAction ? this.$http.patch : this.$http.post;

      const uri = this.updateAction
        ? "/api/products/" + this.$route.params.productId
        : "/api/products";

      httpMethod(uri, {
        ...this.product,
        price: this.product.price * 100,
      })
        .then(() => {
          this.$router.push("/");
        })
        .catch((res) => {
          this.errors = res.response.data.errors;
        });
    },
  },
};
</script>
