<template>
  <div>
    <div v-if="!loading">
      <Header :title="title" />
      
      <div class="px-8 md:px-12">
        <div class="grid md:grid-cols-2">
          <div>
            <div class="mb-12">
              <h3 class="text-xl pb-4">Možnosti volby</h3>
              <ul class="list-disc list-inside">
                <li v-for="option in Object.entries(admin.item.options)" :key="option[0]">
                  {{ option[1].title }}
                </li>
              </ul>
            </div>
            <div class="mb-12">
              <h3 class="text-xl pb-4">Administrace volby</h3>
              <p>
                Email administrátora: {{admin.item.admin}}
              </p>
            </div>
          </div>
          <div>
            <h3 class="text-xl pb-4">Hlasující</h3>
            <ul>
              <li v-for="voter in admin.item.voters" :key="voter">
                <span v-if="voter.voted === false" class="text-gray-400 pr-4 text-lg">
                  ⦾
                </span>

                <span v-else class="text-green-400 pr-4 text-lg">
                  ⦿
                </span>
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

    setInterval(() => {
      this.$store.dispatch('admin/fetch', { slug: this.admin.item.slug, token: this.admin.item.token });
    }, 1000);
  }
}
</script>

<style>

</style>