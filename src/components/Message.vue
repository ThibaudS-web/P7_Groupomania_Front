<template>
	<div class="container col-xxl-5 col-xl-6 col-lg-7 col-md-8 bg-light bg-gradient mb-5 p-4">
		<div class="d-flex justify-content-between">
			<h2 class="h4">Username</h2>
			<i
				v-if="dataUserId == dataMessage.userId"
				@click="deleteMessage(dataMessage.id)"
				class="fas fa-times"
			></i>
		</div>
		<h3 class="h2">{{ dataMessage.title }}</h3>
		<p>{{ dataMessage.content }}</p>
		<div v-if="hasImage" class="container-image">
			<img :src="[dataMessage.attachment]" class="img-fluid image" alt="..." />
		</div>
	</div>
</template>

<script>
const userId = localStorage.getItem("userId");
export default {
	name: "Message",
	data() {
		return {
			dataUserId: userId,
			dataMessage: this.message
		};
	},
	props: {
		message: Object
	},
	methods: {
		deleteMessage(id) {
			this.$emit("delete-message", id);
		}
	},
	computed: {
		hasImage() {
			return this.dataMessage.attachment !== null;
		}
	}
};
</script>

<style scoped>
.container {
	border-radius: 15px;
}
.fas {
	color: red;
}
.container-image {
	max-width: 300px;
	max-height: 300px;
	margin: auto;
}
img {
	height: 100%;
	width: 100%;
	object-fit: contain;
}
</style>
