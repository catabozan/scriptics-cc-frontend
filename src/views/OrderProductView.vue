<template>
  <div class="flex flex-col m-auto p-12">
    <ProductCard v-if="product" :product="product" :orderAction="false" />
    <form @submit.prevent="placeOrder">
      <el-form-item class="w-1/4" label="Address">
        <el-input v-model="form.address" />
      </el-form-item>
      <el-form-item class="w-1/4" label="Phone Number">
        <el-input v-model="form.phone_number" />
      </el-form-item>
      <button v-if="!orderPlaced" type="submit" class="p-4 bg-cyan-100 rounded">
        Place Order
      </button>
    </form>
    <h2 class="text-lg font-bold">{{ orderMessage }}</h2>
    <ErrorList :errors="errors" />
  </div>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue";
import ErrorList from "@/components/ErrorList.vue";

export default {
  components: {
    ProductCard,
    ErrorList,
  },
  created() {
    this.$http
      .get("api/products/" + this.$route.params.productId)
      .then((res) => {
        this.product = res.data.data;
      });
  },
  data() {
    return {
      product: undefined,
      form: {
        address: "",
        phone_number: "",
      },
      errors: {},
      orderMessage: "",
      orderPlaced: false,
    };
  },
  methods: {
    placeOrder() {
      this.$http
        .post("api/orders/" + this.$route.params.productId, this.form)
        .then((res) => {
          this.errors = {};
          this.orderMessage =
            "Order placed successfully (order #" + res.data.data.id + ")";
          this.orderPlaced = true;
        })
        .catch((err) => {
          this.errors = err.response.data.errors ?? {};
        });
    },
  },
};
</script>
