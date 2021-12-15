<template>
	<Header @log-out="logOut" :admin="admin" :connected="connected" />
	<router-view :key="$route.fullPath" @signin-success="onSigninSuccess"></router-view>
</template>

<script>
import Header from "./components/Header.vue";
import AuthManager from "./AuthManager";
export default {
	name: "App",
	data: () => {
		return {
			connected: false,
			admin:''
		};
	},
	props: {},
	components: {
		Header
	},
	methods: {
		onSigninSuccess() {
			this.connected = true;
		},
		logOut() {
			this.connected = false;
		}
	},
	// If token exist, the user is connected
	mounted: function() {
		if (AuthManager.isTokenAvailable()) {
			this.connected = true;
		} else {
			this.connected = false;
		}
	},
	// Verify if the user is an admin
	updated: function()  {
		if (this.connected) {
			const userId = AuthManager.getUserId()
			const headerAuth = AuthManager.getAuthToken()
			fetch(`http://localhost:3000/api/auth/profils/${userId}`, {
				method: "GET",
				headers: {
					"Content-type": "application/json",
					Authorization: headerAuth
				}
			})
				.then(res => {
					if (res.status === 200) {
						return res.json();
					} else {
						throw "Profil Not Found";
					}
				})
				.then(data => {
					this.admin = data.profil.isAdmin;
				})
				.catch(err => console.log(err));
		} else {
			this.admin = false
		}
	}
};
</script>

<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	user-select: none;
}
</style>
