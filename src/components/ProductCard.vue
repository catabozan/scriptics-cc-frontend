<template>
  <el-card class="box-card w-1/3 inline-block p-4 m-2">
    <template #header>
      <div class="card-header flex justify-between">
        <span class="capitalize font-bold">
          {{ product.title }} |
          <span class="text-cyan-800">${{ product.price / 100 }}</span>
        </span>
        <template v-if="user?.admin">
          <div>
            <el-button @click="deleteProduct" type="danger" class="button" text
              >Delete</el-button
            >
            <router-link :to="editRoute">
              <el-button type="primary" class="button" text>Edit</el-button>
            </router-link>
          </div>
        </template>
        <template v-else>
          <router-link :to="orderRoute">
            <el-button v-if="orderAction" type="primary" class="button" text
              >Order</el-button
            >
          </router-link>
        </template>
      </div>
    </template>
    <div>
      <p class="block">{{ product.description }}</p>
      <span class="text-cyan-900"> {{ stockValueString }} </span>
    </div>
  </el-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  emits: ["deleted"],
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
    ...mapGetters(["user"]),
    stockValueString() {
      if (this.product.stock <= 0) {
        return "Out of stock";
      }

      return "Available: " + this.product.stock;
    },
    orderRoute() {
      return "/products/" + this.product.id + "/order";
    },
    editRoute() {
      return "products/" + this.product.id;
    },
  },
  methods: {
    deleteProduct() {
      const that = this;
      this.$http.delete("api/products/" + this.product.id).then(function () {
        that.$emit("deleted");
      });
    },
  },
};
</script>
