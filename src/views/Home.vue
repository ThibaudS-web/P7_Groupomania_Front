<template>
	<h1 class="mb-4">Bienvenue sur le réseau social de Groupomania</h1>
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
import { apiClient } from "../services/ApiClient";

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
		}
	},
	beforeMount: async function() {
		const res = await apiClient.getAllMessages();
		this.messages = res.messages;
	},
	methods: {
		toggleAddMessage() {
			this.showAddMessage = !this.showAddMessage;
		},
		async deleteMessage(id) {
			if (confirm("Are you sure ?")) {
				const res = await apiClient.deleteMessage(id);
				res.status === 200
					? (this.messages = this.messages.filter(message => message.id !== id))
					: alert("Error deleting message!");
			}
		},
		async addMessage(message) {
			const formData = new FormData();
			formData.append("title", message.title);
			formData.append("content", message.content);
			formData.append("image", message.attachment);

			const res = await apiClient.addMessage(formData);
			this.messages.unshift(res);
			this.toggleAddMessage();
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
