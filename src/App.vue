<template>
	<Header @log-out="logOut" :connected="connected" />
	<router-view @signin-success="onSigninSuccess"></router-view>
</template>

<script>
import Header from "./components/Header.vue";
import AuthManager from "./authManager";
export default {
	name: "App",
	data: () => {
		return {
			connected: false
		};
	},
	components: {
		Header
	},
	methods: {
		onSigninSuccess() {
			this.connected = true;
			console.log("co: ", this.connected);
		},
		logOut() {
			this.connected = false;
		}
	},
	mounted: function() {
		console.log("beforeMount-App : Hello");
		if (AuthManager.isTokenAvailable()) {
			this.connected = true;
			console.log("connected :", this.connected);
		} else {
			this.connected = false;
			console.log("not connected :", this.connected);
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
}
</style>
