<template>
	<div :key="message" v-for="message in messages">
		<Message @delete-message="deleteMessage" :message="message" />
	</div>
</template>

<script>
import Message from "./Message.vue";
export default {
	name: "Messages",
	props: {
		messages: Array
	},
	components: {
		Message
	},
	methods: {
		deleteMessage(id) {
			this.$emit("delete-message", id);
		}
	},
	emits: ["delete-message"]
};
</script>
