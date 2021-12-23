<template>
	<div class="body-background">
		<div class="container-fluid d-flex justify-content-center align-items-center h-100">
			<div class="card col-lg-4 col-xl-3  p-3 text-center py-4">
				<h4>Créer un compte</h4>
				<div>
					<span>Tu as déjà un compte ? </span>
					<router-link to="/signin">Se connecter</router-link>
				</div>
				<form>
					<!-- Username  -->
					<div class="mt-3 d-flex flex-column px-3 position-relative">
						<label class="align-self-start fw-bold" for="user-input"
							>Nom d'utilisateur</label
						>
						<input
							@input="resetValidationUsername"
							id="user-input"
							v-model="username"
							class="form-control mb-4 "
							placeholder="Jonathan"
							aria-label="nom utilisateur"
						/>
						<i
							v-if="isValidUser === false"
							class="fas fa-exclamation-circle position-absolute"
						></i>
						<i v-if="isValidUser" class="fas fa-check-circle position-absolute"></i>
						<span class="align-self-start  unvalid-text">{{ textErrorUser }}</span>
					</div>
					<!-- Password  -->
					<div class="d-flex flex-column px-3 mt-3  position-relative">
						<div class="d-flex justify-content-between">
							<label
								class="align-self-start justify-content-between fw-bold"
								for="user-input"
								>Mot de passe</label
							>
							<!-- Show password picture -->
							<div>
								<i
									v-if="!hiddenPassword"
									@click="showPassword"
									type="button"
									class="fas fa-eye align-self-center"
								></i>
								<i
									v-if="hiddenPassword"
									@click="showPassword"
									type="button"
									class="fas fa-eye-slash align-self-center"
								></i>
							</div>
						</div>

						<input
							@input="resetValidationPassword"
							id="password-input"
							v-model="password"
							type="password"
							class="form-control mb-4"
							placeholder="Password"
							aria-label="Password"
						/>
						<i
							v-if="isValidPass === false"
							class="fas fa-exclamation-circle position-absolute"
						></i>
						<i v-if="isValidPass" class="fas fa-check-circle position-absolute"></i>
						<span class="align-self-start unvalid-text">{{ textErrorPassword }}</span>
					</div>
					<!-- Email  -->
					<div class="mt-3 d-flex flex-column px-3 position-relative">
						<label class="align-self-start fw-bold" for="user-input"
							>Adresse mail</label
						>
						<input
							@input="resetValidationEmail"
							id="mail-input"
							v-model="email"
							class="form-control mb-4"
							placeholder="exemple@domaine.com"
							aria-label="adresse mail"
						/>
						<i
							v-if="isValidMail === false"
							class="fas fa-exclamation-circle position-absolute"
						></i>
						<i v-if="isValidMail" class="fas fa-check-circle position-absolute"></i>
						<span class="align-self-start unvalid-text">{{ textErrorEmail }}</span>
					</div>
				</form>
				<!-- Submit  -->
				<button class="btn btn-primary btn-block" @click="fetchCreateUser">
					Créer le compte
				</button>
			</div>
		</div>
	</div>
</template>

<script>
const passwordValidator = require("password-validator");
let schema = new passwordValidator();
schema
	.is()
	.min(6)
	.has()
	.uppercase(1)
	.has()
	.digits(1)
	.has()
	.symbols(1)
	.has()
	.not()
	.spaces();

const emailValidator = require("email-validator");
import { apiClient } from "../services/ApiClient";
import Utils from "../Utils";
export default {
	data() {
		return {
			email: this.email,
			password: this.password,
			username: this.username,
			textErrorEmail: "",
			textErrorPassword: "",
			textErrorUser: "",
			isValidUser: "",
			isValidPass: "",
			isValidMail: "",
			hiddenPassword: true
		};
	},
	methods: {
		showPassword() {
			const passwordInput = document.getElementById("password-input");
			if (this.hiddenPassword) {
				passwordInput.type = "type";
				this.hiddenPassword = !this.hiddenPassword;
			} else {
				passwordInput.type = "password";
				this.hiddenPassword = !this.hiddenPassword;
			}
		},
		resetValidationEmail() {
			const emailInput = document.getElementById("mail-input");
			this.textErrorEmail = "";
			this.isValidMail = "";
			emailInput.setAttribute("class", "form-control");
		},
		resetValidationPassword() {
			const passwordInput = document.getElementById("password-input");
			this.textErrorPassword = "";
			this.isValidPass = "";
			passwordInput.setAttribute("class", "form-control");
		},
		resetValidationUsername() {
			const usernameInput = document.getElementById("user-input");
			this.textErrorUser = "";
			this.isValidUser = "";
			usernameInput.setAttribute("class", "form-control");
		},
		//Create a new user
		fetchCreateUser: function() {
			const newUser = {
				username: this.username,
				email: this.email,
				password: this.password
			};

			const usernameInput = document.getElementById("user-input");
			const passwordInput = document.getElementById("password-input");
			const emailInput = document.getElementById("mail-input");

			const usernameValid =
				newUser.username !== undefined &&
				newUser.username !== "" &&
				Utils.verifyInterval(newUser.username.length, 3, 20);

			const emailIValid =
				newUser.email !== undefined &&
				newUser.email !== "" &&
				emailValidator.validate(newUser.email);

			const passwordValid =
				newUser.password !== undefined &&
				newUser.password !== "" &&
				schema.validate(newUser.password);

			if (usernameValid && emailIValid && passwordValid) {
				usernameInput.setAttribute("class", "form-control valid");
				this.isValidUser = true;
				this.textErrorUser = "";

				passwordInput.setAttribute("class", "form-control valid");
				this.isValidPass = true;
				this.textErrorPassword = "";

				emailInput.setAttribute("class", "form-control valid");
				this.isValidMail = true;
				this.textErrorEmail = "";

				apiClient
					.signup(newUser)
					.then(res => {
						if (res.status === 201) {
							alert(
								`L'utilisateur ${newUser.username} a bien été crée, vous pouvez vous connecter.`
							);
							this.$router.push("/signin");
							return res.json();
						} else {
							alert("Une erreur est survenue");
						}
					})
					.catch(err => console.log(err.message));

			} else {
				//USERNAME VALIDATION
				if (newUser.username === "" || newUser.username === undefined) {
					usernameInput.setAttribute("class", "unvalid-border form-control");
					this.textErrorUser = "Indiquez votre nom d'utilisateur";
					this.isValidUser = false;
				} else if (!Utils.verifyInterval(newUser.username.length, 3, 20)) {
					usernameInput.setAttribute("class", "unvalid-border form-control");
					this.textErrorUser = "Doit contenir entre 3 et 20 caractères";
					this.isValidUser = false;
				} else {
					usernameInput.setAttribute("class", "form-control valid");
					this.isValidUser = true;
					this.textErrorUser = "";
				}

				//PASSWORD VALIDATION
				if (newUser.password === "" || newUser.password === undefined) {
					passwordInput.setAttribute("class", "unvalid-border form-control");
					this.textErrorPassword = "Indiquez votre mot de passe";
					this.isValidPass = false;
				} else if (!schema.validate(newUser.password)) {
					passwordInput.setAttribute("class", "unvalid-border form-control");
					this.isValidPass = false;
					this.textErrorPassword =
						"Doit contenir au moins 6 caractères, une majuscule, un chiffre et un caractère spécial";
				} else {
					passwordInput.setAttribute("class", "form-control valid");
					this.isValidPass = true;
					this.textErrorPassword = "";
				}

				//EMAIL VALIDATION
				if (newUser.email === "" || newUser.email === undefined) {
					emailInput.setAttribute("class", "unvalid-border form-control");
					this.isValidMail = false;
					this.textErrorEmail = "Indiquez votre e-mail";
				} else if (!emailValidator.validate(newUser.email)) {
					emailInput.setAttribute("class", "unvalid-border form-control");
					this.isValidMail = false;
					this.textErrorEmail = "Mail incorrecte";
				} else {
					emailInput.setAttribute("class", "valid form-control");
					this.isValidMail = true;
					this.textErrorEmail = "";
				}
			}
		}
	}
};
</script>

<style scoped>
button {
	margin-top: 15px;
	background-color: #1565c0;
}
span {
	font-size: 0.9rem;
}

.unvalid-border {
	border: 2px rgb(198 40 40) solid;
}
.unvalid-text {
	color: rgb(198 40 40);
}
.fa-exclamation-circle {
	color: rgb(198 40 40);
}
.fa-exclamation-circle,
.fa-check-circle {
	top: 35px;
	right: 25px;
}
.fa-check-circle {
	color: #2e7d32;
}
.valid {
	border: 2px #2e7d32 solid;
}
</style>
