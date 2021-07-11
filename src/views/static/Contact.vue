<template>
  <div>
      <Header :title="title" />

      <div class="px-4">
        kontakt
      </div>
  </div>
</template>

<script>
import Header from '../partials/Header.vue';

export default {
    name: 'Contact',
    components: {
      Header,
    },
    computed: {
      title() {
        return "Kontakt";
      }
    }
}
</script>

<style>

</style>