<template>
	<header>
		<div class="bg-light">
			<div class="container mb-5">
				<div class="row">
					<nav class="navbar navbar-expand-lg navbar-dark">
						<img
							src="../logos/icon-left-font-monochrome-black.svg"
							width="200"
							height="200"
						/>
						<div class="nav-connexion">
							<li class="links">
								<router-link v-show="!showLink" to="/signin">Sign in</router-link>
								<router-link v-show="showLink" to="/profil">My profil</router-link>
							</li>
							<li class="links">
								<router-link v-show="!showLink" to="/signup">Sign Up</router-link>
								<button class="btn btn-secondary btn-sm" v-show="showLink" @click="logout">Log Out</button>
							</li>
						</div>
					</nav>
				</div>
			</div>
		</div>
	</header>
</template>

<script>
export default {
	name: "Header",
	data: () => {
		return {
			showLink: ""
		};
	},
	methods: {
		logout() {
			localStorage.removeItem("token");
			localStorage.removeItem("userId")
			this.$router.push("/signin");
		}
	},
	beforeMount: function() {
		console.log('beforeMount')
		const token = localStorage.getItem("token");
		if (token) {
			console.log('Show profil');
			return this.showLink = true;
		} else {
			console.log("show sign in");
			return this.showLink = false;
		}
	}
};
</script>

<style scoped>
.nav-connexion {
	display: flex;
	margin: auto;
}
.link-active-class {
	color: #ab26ab;
}
.links {
	padding: 0 20px;
	list-style: none;
}
.links:hover {
	text-decoration: underline;
}
a {
	color: #2c3e50;
	text-decoration: none;
	font-weight: bold;
}
</style>
