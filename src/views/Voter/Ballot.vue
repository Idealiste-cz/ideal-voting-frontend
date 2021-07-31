<template>
  <div>
      <div v-if="!loading">
        <Header :title="title" />
      
        <div class="px-8 md:px-12 pb-8 text-center border-b-2">
          <h3 class="text-xl">Volební lístek ve volbě:</h3>
          <h4 class="font-bold text-lg">{{ voter.ballot.title }}</h4>
        </div>

        <div class="px-8 md:px-12 mt-8 text-center">
          <h3 class="text-xl">Možnosti:</h3>
          <sub>Klikněte na možnost pro volbu.</sub>
        </div>

        <div class="px-8 md:px-12 mt-4 text-center">
          <button
            v-for="option in voter.ballot.options"
            :key="option.id"
            :data-option-id="option.id"
            :data-option-title="option.title"
            class="focus:outline-none green-gradient p-2 m-1 rounded shadow-sm"
            @click="addToPreferences($event)"
          >
              {{ option.title }}
          </button>
        </div>

        <div class="px-8 md:px-12 mt-8 text-center">
          <h3 class="text-xl">Vaše hlasování:</h3>
          <ol v-if="preferences.length > 0" class="list-decimal">
            <li v-for="preference in preferences" 
              :key="preference.id"
            >
              <button 
                :id="preference.id"
                class="focus:outline-none green-gradient p-2 m-1 rounded shadow-sm"
              >
                {{ preference.title }}
                <span @click="removeFromPreferences($event)" :data-preference-id="preference.id">
                  x
                </span>
              </button>
            </li>
          </ol>
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
            preferences: []
        }
    },
    async mounted() {
        await this.$store
            .dispatch('voter/fetch', { slug: this.$route.params.slug, token: this.$route.params.token })

        this.loading = false;
    },
    methods: {
      addToPreferences(e) {
        e.preventDefault();
        //"data-option-id" is defined with camel case in dataset, e.g. optionId etc. 
        this.preferences.push({
          "id": e.target.dataset.optionId,
          "title": e.target.dataset.optionTitle
        });
        e.target.classList.add("hidden");
      },
      removeFromPreferences(e) {
        e.preventDefault();
        const index = this.preferences
                          .map(el => { return el.id })
                          .indexOf(e.target.dataset.preferenceId);

        this.preferences.splice(index, 1);
        document
          .querySelector(`[data-option-id='${e.target.dataset.preferenceId}']`)
          .classList
          .remove("hidden");
      }
    }
}
</script>

<style>

</style>