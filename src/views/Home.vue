<template>
	<h1 @click="log" class="mb-4">Bienvenue au réseau social de Groupomania</h1>
	<Button
		@click="toggleAddMessage"
		:text="showAddMessage ? 'Fermer' : 'Nouveau message'"
		:color="showAddMessage ? '#c62828' : '#1565c0'"
	/>
	<AddMessage v-show="showAddMessage" @add-message="addMessage" />
	<Messages @delete-message="deleteMessage" :messages="messages" />
</template>

<script>
import Messages from "../components/Messages.vue";
import AddMessage from "../components/AddMessage.vue";
import Button from "../components/Button.vue";
import AuthManager from "../AuthManager.js";

export default {
	name: "Home",
	props: {},
	components: {
		Messages,
		AddMessage,
		Button
	},
	data() {
		return {
			messages: [],
			showAddMessage: false
		};
	},
	beforeMount: function() {
		const headerAuth = AuthManager.getAuthToken();
		fetch("http://localhost:3000/api/messages", {
			method: "GET",
			headers: {
				"Content-type": "application/json",
				Authorization: headerAuth
			}
		})
			.then(res => {
				if (res.status == 200) {
					return res.json();
				} else {
					throw "Messages cannot be found!";
				}
			})
			.then(dataMessages => {
				this.messages = dataMessages.messages;
				console.log("GET MESSAGES: ", this.messages);
			})
			.catch(err => console.log(err));
	},
	methods: {
		log() {
			console.log(this.adminUser);
		},
		toggleAddMessage() {
			this.showAddMessage = !this.showAddMessage;
		},
		async deleteMessage(id) {
			const headerAuth = AuthManager.getAuthToken();
			if (confirm("Are you sure ?")) {
				const res = await fetch(`http://localhost:3000/api/messages/${id}`, {
					method: "DELETE",
					headers: {
						"Content-type": "application/json",
						Authorization: headerAuth
					}
				});
				res.status === 200
					? (this.messages = this.messages.filter(message => message.id !== id))
					: alert("Error deleting message!");
			}
			console.log(id);
		},
		async addMessage(message) {
			const headerAuth = AuthManager.getAuthToken();
			const formData = new FormData();
			formData.append("title", message.title);
			formData.append("content", message.content);
			formData.append("image", message.attachment);
			const res = await fetch("http://localhost:3000/api/messages", {
				method: "POST",
				headers: {
					Authorization: headerAuth
				},
				body: formData
			});
			if (res.status === 201) {
				const result = await res.json();
				this.messages.unshift(result);
				console.log("POST MESSAGE :", result);
				this.toggleAddMessage();
			} else {
				alert("Message cannot be sent!");
			}
		}
	},
	emits: ["signin-success"]
};
</script>

<style scoped>
img {
	width: 300px;
	height: 200px;
}
#contentMessage {
	border: 1px solid purple;
	margin: 20px auto;
}
</style>
