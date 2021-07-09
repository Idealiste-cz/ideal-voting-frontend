<template>
  <div class="container mx-auto max-w-screen-lg md:shadow-lg md:rounded-xl md:mb-12">
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
  import Footer from '@/views/partials/Footer.vue';

  export default {
    name: 'App',
    components: {
      Footer
    }
  }
</script>