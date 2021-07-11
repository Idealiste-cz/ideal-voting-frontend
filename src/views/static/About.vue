<template>
  <div>
      <Header :title="title" />

      <p class="px-4">
        Nevím
      </p>
  </div>
</template>

<script>
import Header from '../partials/Header.vue';

export default {
    name: 'About',
    components: {
      Header,
    },
    computed: {
      title() {
        return "Jak to funguje?";
      }
    }
}
</script>

<style>

</style>