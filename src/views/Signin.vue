<template>
	<div class="body-background">
		<div class="container-fluid d-flex justify-content-center align-items-center h-100">
			<div class="card p-3 text-center py-4">
				<h4>Connexion à Groupomania</h4>
				<div>
					<span>Tu n'as pas de compte ? </span>
					<router-link to="/signup">S'enregistrer</router-link>
				</div>

				<div class="mt-3 px-3">
					<input v-model="email" class="form-control" placeholder="E-mail" />
					<span>Identifiants incorrects !</span>
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
				<button class="btn btn-primary btn-block mt-3" @click="fetchUserLogin">Se connecter</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			email: this.email,
			password: this.password
		};
	},
	methods: {
		//Testing form ...
		fetchUserLogin: function() {
			const userLog = {
				email: this.email,
				password: this.password
			};
			console.log(userLog)
			fetch("http://localhost:3000/api/auth/login", {
				method: "POST",
				headers: {
					"Content-type": "application/json"
				},
				body: JSON.stringify(userLog)
			})
				.then(res => {
					if (res.status == 200) {
						return res.json();
					} else {
						throw "User not found";
					}
				})
				.then(dataToken => {
					console.log(dataToken);
					localStorage.setItem("token", JSON.stringify(dataToken.token));
					localStorage.setItem("userId", JSON.stringify(dataToken.userId))
					this.$router.push("/");
					this.$emit("signin-success")
				})
				.catch(err => console.log(err));
		}
	}
};
</script>
<style scoped>

</style>