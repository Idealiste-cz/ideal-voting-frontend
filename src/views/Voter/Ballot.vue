<template>
  <div>
      <div v-if="!loading">
        <Header :title="title" />
      
        <div class="px-8 md:px-12 text-center">
            <h3 class="text-xl">Volební lístek ve volbě:</h3>
            <h4 class="font-bold text-lg">{{ voter.ballot.title }}</h4>
        </div>
      </div>

    <div v-else>
      <Header title="Načítám..." />
      <p>
        <img src="../../assets/images/loading.gif" alt="Načítám..." class="mx-auto w-12">
      </p>
    </div>
  </div>
</template>

<script>
import Header from '../partials/Header.vue';
import { mapState } from 'vuex';

export default {
    name: 'Ballot',
    components: { 
        Header
    },
    computed: {
        ...mapState(['voter']),
        title() {
            return `Váš volební lístek`;
        }
    },
    data() {
        return {
            loading: true,
        }
    },
    async mounted() {
        await this.$store
            .dispatch('voter/fetch', { slug: this.$route.params.slug, token: this.$route.params.token })

        this.loading = false;
    }
}
</script>

<style>

</style>