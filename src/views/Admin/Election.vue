<template>
  <div>
    <div v-if="!loading">
      <Header :title="title" />
      
      <div class="px-4">
        <div class="grid grid-cols-2">
          <div>
            <div class="mb-12">
              <h3 class="text-center text-xl">Možnosti volby</h3>
              <ul>
                <li v-for="option in Object.entries(admin.item.options)" :key="option[0]">
                  {{ option[1].title }}
                </li>
              </ul>
            </div>
            <div>
              <h3 class="text-center text-xl">Administrace volby</h3>
              <p>
                Email adminstrátora: {{admin.item.admin}}
              </p>
            </div>
          </div>
          <div>
            <h3 class="text-center text-xl">Hlasující</h3>
            <ul>
              <li v-for="voter in admin.item.voters" :key="voter">
                {{ voter.voted }}
                {{ voter.voter.address }}
              </li>
            </ul>
          </div>
        </div>
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
    await this.$store
      .dispatch('admin/fetch', { slug: this.$route.params.slug, token: this.$route.params.token });

    this.loading = false;
  }
}
</script>

<style>

</style>