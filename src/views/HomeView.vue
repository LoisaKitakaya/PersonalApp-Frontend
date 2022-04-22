<template>
  <div class="home">
    <!-- intro -->
    <!-- intro -->

    <!-- about -->
    <About/>
    <!-- about -->
  </div>
</template>

<script>
// @ is an alias to /src
import About from "@/components/details/About.vue";

export default {
  name: "HomeView",
  components: {
    About,
  },
};
</script>
