<template>
  <footer class="text-center mt-20 pb-6">
    <hr class="mb-6 border-gray-300"/>
    
    <p class="mb-4">
      <router-link :to="{ name: 'About' }" class="hover:underline">Jak to funguje?</router-link> &nbsp;|&nbsp;
      <router-link :to="{ name: 'Contact' }" class="hover:underline">Kontakt</router-link>
    </p>
    
    <p class="text-xs mb-6">
        &copy; Idealisté.cz 2021
    </p>
  </footer>
</template>

<script>
export default {
    name: 'Footer'
}
</script>