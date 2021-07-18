<template>
    <div @keydown.esc="showModal = false">
        <Header :title="title" />
        <div>
            <NewElection @processUserInput="processData"/>
        </div>
        
        <div v-if="showModal !== false">
            <NewElectionValidation :data="userData"/>
        </div>
    </div>
</template>

<script>
import NewElection from './partials/Home/NewElection';
import NewElectionValidation from './partials/Home/NewElectionValidation';
import Header from './partials/Header.vue';
import { parseEmails } from '../helpers/emails';

export default {
  name: 'Home',
  components: {
      NewElection,
      NewElectionValidation,
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
          data.voters = await parseEmails(data.votersInput);
          return this.showModal = true, this.userData = data;
      }
  },
}
</script>
