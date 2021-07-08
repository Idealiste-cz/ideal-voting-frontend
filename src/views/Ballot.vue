<template>
  <div class="container mx-auto max-w-screen-md">
    
    <div v-if="!loading">
      <Header :title="title" />
      <p>
        {{ballot.item.name}}<br>
        {{ballot.item.options}}<br>
        {{ballot.item.voters}}<br>
        {{ballot.item.email}}<br>
        {{ballot.item.id}}
      </p>
    </div>

    <div v-else>
      načítám...
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Header from './partials/Header.vue';

export default {
  name: 'Ballot',
  components: { Header },
  computed: {
    ...mapState(['ballot']),
    title() {
      return `Hlasování "${this.ballot.item.name}"`; 
    }
  },
  data() {
    return {
      loading: true,
    }
  },
  mounted() {
    if (!this.ballot.item.id) {
      this.$store
        .dispatch('ballot/fetch', this.$route.params.id);
    } 

    this.loading = false;
  }
}
</script>

<style>

</style>