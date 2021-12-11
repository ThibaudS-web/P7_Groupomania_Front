<template>
	<div class="body-background">
		<div class="container-fluid d-flex justify-content-center align-items-center h-100">
			<div class="card col-lg-4 col-xl-3 p-3 text-center py-4">
				<h4>Connexion à Groupomania</h4>
				<div>
					<span>Tu n'as pas de compte ? </span>
					<router-link to="/signup">S'enregistrer</router-link>
				</div>
				<form>
					<div class="mt-3 d-flex flex-column position-relative px-3">
						<label class="align-self-start fw-bold" for="mail-input"
							>Adresse mail</label
						>
						<input
							@input="resetValidationEmail"
							id="mail-input"
							v-model="email"
							class="form-control mt-2 mb-3"
							placeholder="exemple@domaine.com"
						/>
						<i
							v-if="isValidMail === false"
							class="fas fa-exclamation-circle position-absolute"
						></i>
						<i v-if="isValidMail" class="fas fa-check-circle position-absolute"></i>
						<span class="align-self-start unvalid-text">{{ textErrorEmail }}</span>
					</div>

					<div class="d-flex flex-column position-relative px-3 mt-3">
						<div class="d-flex justify-content-between">
							<label class="align-self-start fw-bold" for="password-input"
								>Mot de passe</label
							>
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
							class="form-control mb-3"
							placeholder="Password"
							aria-label="Password"
						/>
						<i
							v-if="isValidPass === false"
							class="fas fa-exclamation-circle position-absolute"
						></i>
						<i v-if="isValidPass" class="fas fa-check-circle position-absolute"></i>
						<span id="span-password" class="align-self-start unvalid-text">{{
							textErrorPassword
						}}</span>
					</div>
				</form>
				<span class="unvalid-text mt-2">{{ textError }}</span>
				<button
					id="btn-submit"
					class="btn btn-primary btn-block mt-3"
					@click="fetchUserLogin"
				>
					Se connecter
				</button>
			</div>
		</div>
	</div>
</template>

<script>
const emailValidator = require("email-validator");
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

export default {
	data() {
		return {
			email: this.email,
			password: this.password,
			textError: "",
			isValidPass: "",
			isValidMail: "",
			textErrorPassword: "",
			textErrorEmail: "",
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
			emailInput.setAttribute("class", "form-control");

			this.textErrorEmail = "";
			this.isValidMail = "";
			this.textError = "";

			if (schema.validate(this.password)) {
				const passwordInput = document.getElementById("password-input");
				passwordInput.setAttribute("class", "form-control valid");

				this.isValidPass = true;
				this.textErrorPassword = "";
			}
		},
		resetValidationPassword() {
			const passwordInput = document.getElementById("password-input");
			passwordInput.setAttribute("class", "form-control");

			this.textErrorPassword = "";
			this.isValidPass = "";
			this.textError = "";

			if (emailValidator.validate(this.email)) {
				const emailInput = document.getElementById("mail-input");
				emailInput.setAttribute("class", "valid form-control");

				this.isValidMail = true;
				this.textErrorEmail = "";
			}
		},
		//Testing form ...
		fetchUserLogin: function() {
			const userLog = {
				email: this.email,
				password: this.password
			};

			const passwordInput = document.getElementById("password-input");
			const emailInput = document.getElementById("mail-input");

			const emailIValid =
				userLog.email !== undefined &&
				userLog.email !== "" &&
				emailValidator.validate(userLog.email);

			const passwordValid =
				userLog.password !== undefined &&
				userLog.password !== "" &&
				schema.validate(userLog.password);

			if (emailIValid && passwordValid) {
				passwordInput.setAttribute("class", "form-control valid");
				this.isValidPass = true;
				this.textError = "";

				emailInput.setAttribute("class", "form-control valid");
				this.isValidMail = true;
				this.textError = "";

				fetch("http://localhost:3000/api/auth/login", {
					method: "POST",
					headers: {
						"Content-type": "application/json"
					},
					body: JSON.stringify(userLog)
				})
					.then(res => {
						if (res.status === 200) {
							return res.json();
						} else if (res.status === 401) {
							this.isValidPass = false;
							this.textError = "Identifiants incorrects, veuillez réessayer.";
							this.isValidMail = false;
							emailInput.setAttribute("class", "unvalid-border form-control");
							passwordInput.setAttribute("class", "unvalid-border form-control");
							this.textErrorEmail = "";
							this.textErrorPassword = "";
							throw "User not found";
						} else {
							alert("Une erreur est survenue");
						}
					})
					.then(dataToken => {
						localStorage.setItem("token", JSON.stringify(dataToken.token));
						localStorage.setItem("userId", JSON.stringify(dataToken.userId));
						this.$router.push("/");
						this.$emit("signin-success");
					})
					.catch(err => console.log(err));
			} else {
				//PASSWORD VALIDATION
				if (userLog.password === "" || userLog.password === undefined) {
					passwordInput.setAttribute("class", "unvalid-border form-control");
					this.textErrorPassword = "Indiquez votre mot de passe";
					this.isValidPass = false;
				} else if (!schema.validate(userLog.password)) {
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
				if (userLog.email === "" || userLog.email === undefined) {
					emailInput.setAttribute("class", "unvalid-border form-control");
					this.isValidMail = false;
					this.textErrorEmail = "Indiquez votre e-mail";
				} else if (!emailValidator.validate(userLog.email)) {
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
@media (min-width: 1600px) {
	#btn-submit {
		width: 40%;
		align-self: center;
	}
}

.valid {
	border: 2px #2e7d32 solid;
}
.unvalid-border {
	border: 2px rgb(198 40 40) solid;
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
.unvalid-text {
	color: rgb(198 40 40);
}
#span-password {
	max-width: fit-content;
	text-align: start;
}
</style>
