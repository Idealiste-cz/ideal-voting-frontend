<template>
  <div>
      <form @keydown.enter.prevent="" @submit.prevent="">
        <div class="text-lg text-center mb-6" id="form-name">
            <div class="mb-2">
                <label for="title">Název hlasování</label>
            </div>
            <div>
                <input 
                    type="text"
                    v-model="title"
                    id="title"
                    class="focus:outline-none border border-gray-400 rounded bg-transparent w-3/4" required>
            </div>
        </div>
        <div class="text-lg text-center mb-6" id="form-email">
            <div class="mb-2">
                <label for="ballotAdminEmail">Váš email</label>
            </div>
            <div>
                <input 
                    id="ballotAdminEmail"
                    type="email"
                    v-model="admin"
                    @input="checkEmailValidity"
                    class="focus:outline-none border border-gray-400 rounded bg-transparent w-3/4"
                    :class="{ 'border-red-700' : invalidEmail }"
                    required
                >
            </div>
        </div>

        <div class="text-lg text-center mb-6" id="form-options">
            <div class="mb-2">
                <label for="optionInput">Možnosti volby</label>
            </div>
            <div>
                <input 
                    type="text"
                    v-model="optionInput"
                    id="optionInput"
                    class="focus:outline-none -ml-4 border rounded border-gray-400 rounded bg-transparent w-3/4"
                    @keyup.enter="pushToOptions"
                >
                <button @click.prevent="pushToOptions" class="-ml-20 text-gray-500 hover:text-green-600">Přidat</button> ⤶
            </div>
            <div v-if="Object.keys(options).length > 0" class="mt-4">
                <button 
                    v-for="option in Object.entries(options)" 
                    :key="option[0]" 
                    class="focus:outline-none green-gradient p-2 m-1 rounded shadow-sm"
                    @click.prevent
                >
                    <span class="font-bold pointer-events-none">{{ option[1].title }}</span>
                    <span @click="removeFromOptions(option[0])" class="ml-2 inline-block align-middle hover:text-red-600">×</span>
                </button>
            </div>
        </div>

        <div id="form-voters" class="text-lg text-center mb-6">
            <div class="mb-2">
                <label for="ballotVoters">Emaily hlasujících*</label>
            </div>
            <div>
                <textarea
                    v-model="votersInput"
                    id="votersInput"
                    rows="10"
                    class="focus:outline-none border rounded border-gray-400 rounded bg-transparent w-3/4"
                    required
                ></textarea>
                <p class="text-sm italic pl-12 pr-12">
                    *Nezapomeňte zadat i svůj, pokud patříte mezi hlasující. Emaily oddělujte čárkou.
                </p>
            </div>
        </div>

        <div class="text-center mb-12">
            <button
                id="submit-form"
                @click="processUserInput"
                class="p-4 mt-4 rounded font-bold shadow-lg"
            >
                Pokračovat
            </button>
        </div>
    </form>
  </div>
</template>

<script>
import { regexPlainEmail } from '@/helpers/regex';

export default {
    name: 'NewBallot',
    emits: ['processUserInput'],
    data() {
      return {
          title: null,
          admin: null,
          optionInput: null,
          options: [],
          votersInput: null,
          invalidEmail: false,
      }
    },
    methods: {
        checkEmailValidity() {
            this.invalidEmail = (regexPlainEmail(this.admin) === false)
                ? true
                : false;
        },
        pushToOptions() {
            const option = {
                title: this.optionInput,
                description: null
            }

            this.options.push(option);
            return this.optionInput = null;
        },
        removeFromOptions(item) {
            return this.options.splice(item, 1);
        },
        processUserInput() {
            if (
                this.title !== null
                && this.admin !== null
                && this.options.length > 0
                && this.votersInput !== null
            ) {
                let userData = {
                    title: this.title,
                    admin: this.admin,
                    options: this.options,
                    votersInput: this.votersInput
                };
    
                this.$emit("processUserInput", userData);
            }
        },
          
    },
}
</script>

<style>

</style>