<template>
  <div class="flex flex-col m-auto p-12">
    <form @submit.prevent="register">
      <el-form-item class="w-1/3" label="Name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item class="w-1/3" label="Email">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item class="w-1/3" label="Password">
        <el-input type="password" v-model="form.password" />
      </el-form-item>
      <el-form-item class="w-1/3" label="Confirm Password">
        <el-input type="password" v-model="form.password_confirmation" />
      </el-form-item>
      <button type="submit" class="p-4 bg-cyan-100 rounded">Register</button>
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
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
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
          .post("/register", this.form)
          .then(() => {
            // fetch authenticated's user data
            this.$store.dispatch("fetchUser", this);
            this.$router.push("/");
          })
          .catch((res) => {
            this.errors = res.response.data.errors;
          });
      });
    },
  },
};
</script>
