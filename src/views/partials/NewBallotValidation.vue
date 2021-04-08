<template>
  <div>
      Název hlasování: <input type="text" v-model="ballotName" class="bg-transparent"><br>
      Váš email: <input type="text" v-model="ballotAdminEmail" class="bg-transparent"><br>
      <br>
      <h3>Kontrola emailů hlasujících:</h3>
      <span v-for="voter in ballotVoters" :key="voter">
          <input type="text" :value="voter" class="bg-transparent voter-input"><br>
      </span>
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
            ballotVoters: this.data.ballotVoters,
        }
    },
}
</script>

<style>

</style>