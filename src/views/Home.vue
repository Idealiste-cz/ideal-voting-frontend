<template>
    <div class="container mx-auto max-w-screen-md">
        <div id="home-header">
            <h1 class="text-4xl text-center font-bold mt-12">Hlasuj tajně</h1>
        </div>

        <div v-if="userData === null">
            <NewBallot @processUserInput="processData"/>
        </div>
        
        <div v-else>
            <NewBallotValidation :data="userData"/>
        </div>

    </div>
</template>

<script>
import NewBallot from './partials/NewBallot';
import NewBallotValidation from './partials/NewBallotValidation';
import { parseEmails } from '../helpers/parseEmails';

export default {
  name: 'Home',
  components: {
      NewBallot,
      NewBallotValidation
  },
  data() {
      return {
          userData: null
      }
  },
  methods: {
      async processData(data) {
          data.ballotVoters = await parseEmails(data.ballotVotersInput);
          return this.userData = data;
      }
  }
}
</script>
