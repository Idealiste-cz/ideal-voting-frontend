<template>
	<div 
		class="main-modal fixed w-full h-100 inset-0 z-50 overflow-hidden flex justify-center items-center animated fadeIn faster"
		style="background: rgba(0,0,0,.7);"
	>
		<div
			class="border border-teal-500 shadow-lg modal-container bg-white w-11/12 md:max-w-xl mx-auto rounded shadow-lg z-50 overflow-y-auto"
			
		>
			<div class="modal-content py-4 text-left px-6">
			
				<!--Title-->
				<div class="flex justify-between items-center pb-3">
					<p class="text-2xl font-bold">Shrnutí</p>
					<div class="modal-close cursor-pointer z-50" @click="closeModal">
						<svg class="fill-current text-black hover:text-red-600" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
							viewBox="0 0 18 18">
							<path
								d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z">
							</path>
						</svg>
					</div>
				</div>
				<!--Body-->
				<div class="my-5">

					<div class="scroll">
						<div class="grid grid-cols-1 md:grid-cols-2 mb-2">
							<div class="text-left italic">Název hlasování:</div>
							<div class="text-left md:text-right font-bold break-words">{{ data.ballotName }}</div>
						</div>
						<div class="grid grid-cols-1 md:grid-cols-2 mb-2">
							<div class="text-left italic">Váš email:</div>
							<div class="text-left md:text-right font-bold break-words">{{ data.ballotAdminEmail }}</div>
						</div>
						<div class="grid grid-cols-1 md:grid-cols-2 mb-4">
							<div class="text-left italic">Možnosti:</div>
							<div class="text-left md:text-right">
								<span v-for="option in data.ballotOptions" :key="option" class="font-bold">
									<span class="text-gray-300 md:hidden">-</span> {{ option }}<br>
								</span>
							</div>
						</div>
						<hr class="mb-4">
						<div class="grid grid-cols-2 mb-4">
							<div class="text-left italic">Hlasující:</div>
							<div class="text-right"></div>
						</div>
						<div v-for="voter in data.ballotVoters" :key="voter.email" class="mb-4 text-left">
							<div :id="voter.id">
								<button @click.prevent="removeVoter(voter.id)" class="text-red-400 hover:text-red-600">×</button>
								<input 
									type="text"
									:value="voter.email"
									:data-voters="voter.id"
									:class="{ 'border-red-700' : !voter.status }"
									class="focus:outline-none bg-transparent voter-input border rounded ml-2 p-1 pl-2"
									@input="validateVoterEmailOnFly(voter.id)"
								>
							</div>
						</div>
					</div>
					<!--Footer-->
					<div class="flex justify-center pt-2">
						<button
							id="submit-form"
							class="focus:outline-none p-4 m-2 rounded font-bold shadow-lg"
							@click="setData"
						>
							Potvrdit
						</button>
					</div>
				</div>
			</div>	
		</div>
	</div>
</template>

<script>
import gsap from 'gsap';
import { mapState } from 'vuex';
import { regexPlainEmail } from '@/helpers/regex';

export default {
    name: "NewBallotValidation",
    props: ['data'],
	computed: {
		...mapState(['ballot']),
	},
    methods: {
        closeModal() {
            return this.$parent.$data.showModal = false;
        },
		disableSubmitButton() {
			const buttons = document.querySelectorAll("#submit-form");
			
			for (const btn of buttons) {
				setTimeout(() => {
					btn.disabled = true;
					btn.innerHTML = "Zpracovávám...";
				}, 100);
			}
		},
		processVoters() {
			let voters = [];
			document.querySelectorAll("[data-voters]").forEach(item => {
				voters.push(item.value);
			});

			return voters;
		},
		validateVoterEmailOnFly(id) {
			let inputData = document.querySelector("[data-voters='"+id+"']");

			if (regexPlainEmail(inputData.value)) {
				inputData.classList.remove('border-red-700');
				gsap.to("[data-voters='"+id+"']", {x: 0, duration: 1.00, ease: 'elastic'});
			} else {
				inputData.classList.add('border-red-700');
				gsap.to("[data-voters='"+id+"']", {x: 10, duration: 1.00, ease: 'elastic'});
			}
		},
		async removeVoter(id) {
			const el = document.getElementById(id);
			await gsap.to(el, {opacity: 0, duration: 0.5});
			el.remove();
		},
		async setData() {
			this.disableSubmitButton();

			let data = {
				email: this.data.ballotAdminEmail,
				name: this.data.ballotName,
				options: this.data.ballotOptions,
				voters: this.processVoters()
			};

			await this.$store.dispatch('ballot/new', data);
			const id = this.$store.state.ballot.item.id;
			this.$router.push({ name: 'Ballot', params: { id }});
		}
    },
	mounted() {
		let tween = gsap.to(".border-red-700", {x: 10, duration: 1.00, ease: 'elastic'});
		tween.play();
	}
}
</script>

<style>
		.animated {
			-webkit-animation-duration: 1s;
			animation-duration: 1s;
			-webkit-animation-fill-mode: both;
			animation-fill-mode: both;
		}

		.animated.faster {
			-webkit-animation-duration: 500ms;
			animation-duration: 500ms;
		}

		.fadeIn {
			-webkit-animation-name: fadeIn;
			animation-name: fadeIn;
		}

		.fadeOut {
			-webkit-animation-name: fadeOut;
			animation-name: fadeOut;
		}

		@keyframes fadeIn {
			from {
				opacity: 0;
			}

			to {
				opacity: 1;
			}
		}

		@keyframes fadeOut {
			from {
				opacity: 1;
			}

			to {
				opacity: 0;
			}
		}
</style>