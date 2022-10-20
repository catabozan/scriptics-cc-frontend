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
    <ol v-if="errors">
      <li v-for="(fieldErrors, index) in errors" :key="index">
        <ol class="list-disc">
          <li v-for="error in fieldErrors" :key="error">{{ error }}</li>
        </ol>
      </li>
    </ol>
  </div>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue";

export default {
  components: {
    ProductCard,
  },
  created() {
    this.$http.get("/products/" + this.$route.params.productId).then((res) => {
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
      errors: [],
      orderMessage: "",
      orderPlaced: false,
    };
  },
  methods: {
    placeOrder() {
      this.$http
        .post("/orders/" + this.$route.params.productId, this.form)
        .then((res) => {
          console.log(res);
          this.errors = [];
          this.orderMessage =
            "Order placed successfully (order #" + res.data.data.id + ")";
          this.orderPlaced = true;
        })
        .catch((err) => {
          console.log(err);
          this.errors = err.response.data.errors;
          this.orderMessage = "The information is invalid";
        });
    },
  },
};
</script>
