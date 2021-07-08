<template>
    <div class="container mx-auto max-w-screen-md" @keydown.esc="showModal = false">
        <Header :title="title" />
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
import NewBallot from './partials/Home/NewBallot';
import NewBallotValidation from './partials/Home/NewBallotValidation';
import Footer from './partials/Footer.vue';
import Header from './partials/Header.vue';
import { parseEmails } from '../helpers/emails';

export default {
  name: 'Home',
  components: {
      NewBallot,
      NewBallotValidation,
      Footer,
      Header
  },
  data() {
      return {
          showModal: false,
          userData: null,
          title: 'Založte bezpečné hlasování teď hned!'
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
