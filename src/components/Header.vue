<template>
	<header>
		<div class="bg-light">
			<div class="container mb-5">
				<div class="row">
					<nav class="navbar navbar-expand-lg navbar-dark">
						<a href="/"
							><img
								src="../logos/icon-left-font-monochrome-black.svg"
								width="200"
								height="200"
							/>
						</a>
						<div class="nav-connexion">
							<li class="links">
								<router-link :to="url">{{ textLink }}</router-link>
							</li>
							<li class="links">
								<router-link v-show="!showLink" to="/signup">S'enregistrer</router-link>
								<button
									class="btn btn-secondary btn-sm"
									v-show="showLink"
									@click="logout"
								>
									Se déconnecter
								</button>
							</li>
						</div>
					</nav>
				</div>
			</div>
		</div>
	</header>
</template>

<script>
import authManager from "../authManager";
export default {
	name: "Header",
	props: {
		connected: Boolean
	},
	data() {
		return {
			showLink: "",
			url: "/signin",
			textLink: "Sign in"
		};
	},
	methods: {
		logout() {
			localStorage.removeItem("token");
			localStorage.removeItem("userId");
			this.$router.push("/signin");
			this.showLink = false;
			this.url = "/signin";
			this.textLink = "Se connecter";
			this.$emit("log-out");
		}
	},
	beforeUpdate: function() {
		if (this.connected) {
			console.log("connected");
			this.showLink = true;
			this.url = `/profil/${authManager.getUserId()}`;
			this.textLink = "Mon profil";
		} else {
			console.log("not connected");
			this.showLink = false;
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
