<template>
	<button @click="toggleAddMessage" :style="{ background: color }" class="btn">{{ text }}</button>
</template>

<script>
export default {
	name: "Button",
	props: {
		text: String,
		color: String
	},
	methods: {
		toggleAddMessage() {
			this.$emit("toggle-add-message");
		}
	}
};
</script>

<style scoped>
button {
	margin-bottom: 20px;
	color: white;
}
button:hover {
	color: white;
}
</style>
