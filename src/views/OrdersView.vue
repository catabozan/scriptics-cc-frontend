<template>
  <div class="flex flex-wrap justify-center">
    <el-card
      class="box-card w-1/3 inline-block p-4 m-2"
      v-for="order in orders"
      :key="order.id"
    >
      <template #header>
        <div class="card-header flex justify-between">
          <span class="capitalize font-bold"> Order #{{ order.id }}</span>
          <el-button
            @click="cancelOrder(order.id)"
            type="danger"
            class="button"
            text
            >Cancel Order</el-button
          >
        </div>
      </template>
      <div>
        <p class="block">Shipping to: {{ order.address }}</p>
        <span class="text-cyan-900">Phone: {{ order.phone_number }} </span>
      </div>
      <div class="mt-4">
        <span class="text-xl">Product details</span>
        <span class="block capitalize">Name: {{ order.product.title }}</span>
        <span class="block">Price: ${{ order.product.price }}</span>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  created() {
    this.$http.get("/api/orders").then((res) => {
      this.orders = res.data.data;
    });
  },
  data() {
    return {
      orders: [],
    };
  },
  methods: {
    cancelOrder(id) {
      this.$http.delete("/api/orders/" + id).then(() => {
        this.orders = this.orders.filter((order) => order.id !== id);
      });
    },
  },
};
</script>
