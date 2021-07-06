<template>
    <div class="container mx-auto max-w-screen-md" @keydown.esc="showModal = false">
        <div id="home-header" class="purple-gradient md:mt-12 mb-12 pt-12 pb-24 md:rounded shadow-xl">
            <h1 class="text-4xl text-center mt-12 text-white" id="main-header">Tajná volba</h1>
            <h4 class="text-white text-center" id="main-subheader">Bezpečné hlasování teď hned!</h4>
        </div>

        <div>
            <NewBallot @processUserInput="processData"/>
        </div>
        
        <div v-if="showModal !== false">
            <NewBallotValidation :data="userData"/>
        </div>

        <Footer />
    </div>
</template>

<script>
import NewBallot from './partials/NewBallot';
import NewBallotValidation from './partials/NewBallotValidation';
import Footer from './partials/Footer.vue';
import { parseEmails } from '../helpers/emails';

export default {
  name: 'Home',
  components: {
      NewBallot,
      NewBallotValidation,
      Footer
  },
  data() {
      return {
          showModal: false,
          userData: null,
      }
  },
  methods: {
      async processData(data) {
          data.ballotVoters = await parseEmails(data.ballotVotersInput);
          return this.showModal = true, this.userData = data;
      }
  },
}
</script>
