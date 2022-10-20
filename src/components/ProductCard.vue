<template>
  <el-card class="box-card w-1/3 inline-block p-4 m-2">
    <template #header>
      <div class="card-header flex justify-between">
        <span class="capitalize font-bold">
          {{ product.title }} |
          <span class="text-cyan-800">${{ product.price / 100 }}</span>
        </span>
        <router-link :to="orderRoute">
          <el-button v-if="orderAction" type="primary" class="button" text
            >Order</el-button
          >
        </router-link>
      </div>
    </template>
    <div>
      <p class="block">{{ product.description }}</p>
      <span class="text-cyan-900"> {{ stockValueString }} </span>
    </div>
  </el-card>
</template>

<script>
export default {
  props: {
    product: {
      required: true,
      type: Object,
    },
    orderAction: {
      default: true,
      type: Boolean,
    },
  },
  computed: {
    stockValueString() {
      if (this.product.stock <= 0) {
        return "Out of stock";
      }

      return "Available: " + this.product.stock;
    },
    orderRoute() {
      return "/products/" + this.product.id + "/order";
    },
  },
};
</script>
