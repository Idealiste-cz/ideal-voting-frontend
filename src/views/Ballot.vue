<template>
  <div>
      ahoj {{ currentBallot.id }} {{ currentBallot.name }} {{ currentBallot.options }} {{ currentBallot.voters }}
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Ballot',
  computed: {
    ...mapState(['ballot']),
  },
  data() {
    return {
      currentBallot: this.$store.getters['ballot/fetchState']
    }
  }
}
</script>

<style>

</style>