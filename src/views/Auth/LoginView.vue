<template>
  <div class="flex flex-col m-auto p-12">
    <ProductCard v-if="product" :product="product" :orderAction="false" />
    <form @submit.prevent="register">
      <el-form-item class="w-1/3" label="Email">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item class="w-1/3" label="Password">
        <el-input type="password" v-model="form.password" />
      </el-form-item>
      <button type="submit" class="p-4 bg-cyan-100 rounded">Log In</button>
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
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      errors: {},
    };
  },
  methods: {
    register() {
      // CSRF Token
      this.$http.get("/sanctum/csrf-cookie").then(() => {
        // register user
        this.$http
          .post("/login", this.form)
          .then(() => {
            // fetch authenticated's user data
            this.$http.get("/api/user").then((res) => {
              this.$store.commit("setUser", res.data.data);
              this.$router.push("/");
            });
          })
          .catch((res) => {
            this.errors = res.response.data.errors;
          });
      });
    },
  },
};
</script>
