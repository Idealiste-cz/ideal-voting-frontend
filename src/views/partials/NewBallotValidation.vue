<template>
  <div>
      {{ ballotAdminEmail }}<br>
      {{ ballotName }}<br>
      {{ ballotVoters }}
  </div>
</template>

<script>
export default {
    name: "NewBallotValidation",
    props: ['data'],
    data() {
        return {
            ballotAdminEmail: this.data.ballotAdminEmail,
            ballotName: this.data.ballotName,
            ballotOptions: this.data.ballotOptions,
            ballotVoters: this.data.ballotVoters
        }
    },
}
</script>

<style>

</style>