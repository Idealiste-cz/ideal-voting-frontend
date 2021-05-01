<template>
    <div class="container mx-auto max-w-screen-md" @keydown.esc="showModal = false">
        <div id="home-header">
            <h1 class="text-4xl text-center font-bold mt-12">Hlasuj tajně</h1>
        </div>

        <div>
            <NewBallot @processUserInput="processData"/>
        </div>
        
        <div v-if="showModal !== false">
            <NewBallotValidation :data="userData"/>
        </div>

    </div>
</template>

<script>
import NewBallot from './partials/NewBallot';
import NewBallotValidation from './partials/NewBallotValidation';
import { parseEmails } from '../helpers/emails';

export default {
  name: 'Home',
  components: {
      NewBallot,
      NewBallotValidation
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
  }
}
</script>
