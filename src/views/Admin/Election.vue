<template>
  <div>
    <div v-if="!loading">
      <Header :title="title" />
      
      <div class="px-4">
        <p>
          {{admin.item.title}}<br>
          {{admin.item.options}}<br>
          {{admin.item.voters}}<br>
          {{admin.item.admin}}<br>
          {{admin.item.token}}
        </p>
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
import { mapState } from 'vuex';
import Header from '../partials/Header.vue';

export default {
  name: 'Election',
  components: { Header },
  computed: {
    ...mapState(['admin']),
    title() {
      return this.admin.item.title; 
    }
  },
  data() {
    return {
      loading: true,
    }
  },
  async mounted() {
    if (!this.admin.item.token) {
      await this.$store
        .dispatch('admin/fetch', { slug: this.$route.params.slug, token: this.$route.params.token });
    }

    this.loading = false;
  }
}
</script>

<style>

</style>