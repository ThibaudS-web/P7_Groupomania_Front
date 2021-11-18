<template>
	<div class="body-background">
		<div class="container-fluid d-flex justify-content-center align-items-center h-100">
			<div class="card p-3 text-center py-4">
				<h4>Create account</h4>
				<div>
					<span>Already have an account?</span>
					<router-link to="/signin">Sign In</router-link>
				</div>

				<div class="mt-3 px-3">
					<input 
						v-model="username" 
						class="form-control" 
						placeholder="Username"
					/>
				</div>

				<div class="input-group px-3 mt-3">
					<input
						v-model="password"
						type="text"
						class="form-control"
						placeholder="Password"
						aria-label="Password"
					/>
				</div>

				<div class="mt-3 px-3">
					<input v-model="email" class="form-control" placeholder="E-mail" />
				</div>
				<button class="btn btn-primary btn-block" @click="fetchUserLogin">Sign up</button>
			</div>
		</div>
	</div>
</template>

<script>
const passwordValidator = require("password-validator");
let schema = new passwordValidator();
schema
	.is().min(6)
	.has().uppercase(1)
	.has().digits(1)
	.has().symbols(1)
	.has().not().spaces();

export default {
	data() {},
	methods: {
		//Create a new user
		fetchCreateUser: function() {
			const newUser = {
				username: "Thibaud",
				email: "thibaud@gmail.com",
				password: "Password16?"
			};
			if (
				schema.validate(newUser.password) /*&&
				this.username == !undefined &&
				this.email == !undefined &&
				this.password == !undefined*/
			) {
				fetch("http://localhost:3000/api/auth/signup", {
					method: "POST",
					headers: {
						"Content-type": "application/json"
					},
					body: JSON.stringify(newUser)
				})
					.then(res => {
						console.log("User created!");
						return res.json();
					})
					.catch(err => console.log(err.message));

				alert(`L'utilisateur ${newUser.username} a bien été crée, vous pouvez vous connecter.`)
				window.location.replace("http://localhost:8080/signin");
			} else {
				console.log("Wrong password! or incomplete fields");
			}
		}
	}
};
</script>

<style scoped>
button {
	margin-top: 15px;
}
</style>