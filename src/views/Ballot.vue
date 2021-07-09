<template>
  <div>
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
      <Header title="Načítám..." />
      <p>
        <img src="../assets/images/loading.gif" alt="Načítám..." class="mx-auto w-12">
      </p>
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
      return `Probíhá „${this.ballot.item.name}“.`; 
    }
  },
  data() {
    return {
      loading: true,
    }
  },
  async mounted() {
    if (!this.ballot.item.id) {
      await this.$store
        .dispatch('ballot/fetch', this.$route.params.id);

    }

    this.loading = false;
  }
}
</script>

<style>

</style>