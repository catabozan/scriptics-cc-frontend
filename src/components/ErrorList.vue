<template>
  <div v-if="hasErrors">
    <span class="text-lg text-red-700">
      {{ message }}
    </span>
    <ol>
      <li v-for="(fieldErrors, index) in errors" :key="index">
        <ol class="list-disc">
          <li v-for="error in fieldErrors" :key="error">{{ error }}</li>
        </ol>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  props: {
    errors: {
      required: true,
      type: Object,
    },
    message: {
      default: "The information is invalid",
      type: String,
    },
  },
  computed: {
    hasErrors() {
      return Object.keys(this.errors).length > 0;
    },
  },
};
</script>
