<template>
  <el-card class="box-card w-1/3 inline-block">
    <template #header>
      <div class="card-header flex justify-between">
        <span class="capitalize font-bold">{{ product.title }}</span>
        <el-button class="button" text>Order</el-button>
      </div>
    </template>
    <span>{{ product.description }}</span>
  </el-card>
</template>

<script>
export default {
  props: {
    product: {
      required: true,
      type: Object,
    },
  },
};
</script>
