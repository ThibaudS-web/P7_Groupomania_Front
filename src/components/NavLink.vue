<template>
	<router-link :to="url">{{ text }}</router-link>
</template>

<script>
export default {
	name: "NavLink",
	props: ["url", "text"]
};
</script>

<style>
a {
	text-decoration: none;
}
</style>
