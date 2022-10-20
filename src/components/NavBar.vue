<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <router-link to="/">
      <el-menu-item index="0">Products</el-menu-item>
    </router-link>

    <!-- Guest User -->
    <template v-if="!user">
      <el-sub-menu index="2">
        <template #title>Account</template>

        <router-link to="/register">
          <el-menu-item index="2-1">Register</el-menu-item>
        </router-link>

        <router-link to="/login">
          <el-menu-item index="2-2">Login</el-menu-item>
        </router-link>
      </el-sub-menu>
    </template>

    <!-- Authenticated User -->
    <template v-else>
      <router-link to="/orders">
        <el-menu-item index="1">Orders</el-menu-item>
      </router-link>

      <el-sub-menu index="2">
        <template #title>{{ user.name }}</template>
        <el-menu-item index="2-1" @click="logout">Logout</el-menu-item>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    logout() {
      this.$http.post("/logout").then(() => {
        this.$store.commit("setUser", undefined);
      });
    },
  },
};
</script>

<style></style>
