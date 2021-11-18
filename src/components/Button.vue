<template>
	<button :style="{ background: color }" class="btn mt-3 mb-4">{{ text }}</button>
</template>

<script>
export default {
	name: "Button",
	props: {
		text: String,
		color: String
	}
};
</script>

<style scoped>
button {
	color: white;
}
button:hover {
	color: white;
}
</style>
