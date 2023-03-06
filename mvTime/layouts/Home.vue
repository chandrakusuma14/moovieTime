<template>
  <div class="min-h-screen w-screen">
    <Header />
    <Nuxt />
    <Footer />
  </div>
</template>

<script>
import Header from "../components/Home/Header.vue";
import Footer from "../components/Home/Footer.vue";
export default {
  components: {
    Header,
    Footer,
  },
};
</script>
