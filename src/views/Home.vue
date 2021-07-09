<template>
    <div @keydown.esc="showModal = false">
        <Header :title="title" />
        <div>
            <NewBallot @processUserInput="processData"/>
        </div>
        
        <div v-if="showModal !== false">
            <NewBallotValidation :data="userData"/>
        </div>
    </div>
</template>

<script>
import NewBallot from './partials/Home/NewBallot';
import NewBallotValidation from './partials/Home/NewBallotValidation';
import Header from './partials/Header.vue';
import { parseEmails } from '../helpers/emails';

export default {
  name: 'Home',
  components: {
      NewBallot,
      NewBallotValidation,
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
