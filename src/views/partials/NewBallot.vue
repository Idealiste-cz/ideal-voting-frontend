<template>
  <div>
      <form @keydown.enter.prevent="" @submit.prevent="">
        <div id="form-name">
            <div>
                <label for="ballotName">Název hlasování</label>
            </div>
            <div>
                <input type="text" v-model="ballotName" id="ballotName" class="border-2 rounded" required>
            </div>
        </div>

        <div id="form-email">
            <div>
                <label for="ballotAdminEmail">Váš email</label>
            </div>
            <div>
                <input 
                    type="email"
                    v-model="ballotAdminEmail"
                    @input="checkEmailValidity"
                    id="ballotAdminEmail"
                    class="border-2 rounded"
                    :class="{ 'border-red-700' : invalidEmail }"
                    required>
            </div>
        </div>

        <div id="form-options">
            <div>
                <label for="ballotOptionInput">Možnosti volby</label>
            </div>
            <div>
                <input 
                    type="text"
                    v-model="ballotOptionInput"
                    id="ballotOptionInput"
                    class="border-2 rounded"
                    @keyup.enter="pushToOptions"
                >
            </div>
            <div v-if="Object.keys(ballotOptions).length > 0" class="mt-4">
                <span v-for="bo in ballotOptions" :key="bo.id" class="p-2 mr-2 border rounded">
                    {{ bo.value }} | <button @click="removeFromOptions(bo.id)">x</button>
                </span>
            </div>
        </div>

        <div id="form-voters" class="mt-4">
            <div>
                <label for="ballotVoters">Emaily hlasujících (vč. vás)</label>
            </div>
            <div>
                <textarea v-model="ballotVotersInput" id="ballotVotersInput" cols="30" rows="10" class="border-2 rounded"></textarea>
            </div>
        </div>

        <button @click="processUserInput" class="border-2 p-4 mt-4 rounded hover:bg-gray-300">
            Dále
        </button>
        </form>
  </div>
</template>

<script>
import { regexEmail } from '@/helpers/regex';

export default {
    name: 'NewBallot',
    emits: ['processUserInput'],
    data() {
      return {
          ballotName: null,
          ballotAdminEmail: null,
          ballotOptionInput: null,
          ballotOptions: {},
          ballotVotersInput: null,
          invalidEmail: false
      }
    },
    methods: {
        checkEmailValidity() {
            if (regexEmail(this.ballotAdminEmail) === false) {
                this.invalidEmail = true;
            } else {
                this.invalidEmail = false;
            }

            return this.invalidEmail;
        },
        pushToOptions() {
            let index = Math.random();
            this.ballotOptions[index] = { id: index, value: this.ballotOptionInput };
            return this.ballotOptionInput = null;
        },
        removeFromOptions(item) {
            return delete this.ballotOptions[item];
        },
        processUserInput() {
            let userData = {
                ballotName: this.ballotName,
                ballotAdminEmail: this.ballotAdminEmail,
                ballotOptions: this.ballotOptions,
                ballotVotersInput: this.ballotVotersInput
            };

            this.$emit("processUserInput", userData);
        },
          
    },
}
</script>

<style>

</style>