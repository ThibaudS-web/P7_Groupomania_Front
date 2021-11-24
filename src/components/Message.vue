<template>
	<div
		class="container col-xxl-5 col-xl-6 col-lg-7 col-md-8 bg-light bg-gradient mb-5 pb-4 pt-2 px-4"
	>
		<div id="header-message" class="d-flex">
			<div class="container-image-profil">
				<a :href="profilUrl">
					<img
						id="picture-profil"
						:src="dataMessage.User.picture"
						class="align-self-center"
						alt="Photo de l'auteur du message"
					/>
				</a>
			</div>
			<h2 id="username-text" class="h6 align-self-center">
				Crée par {{ dataMessage.User.username }}
			</h2>
			<i
				v-if="dataUserId == dataMessage.userId"
				@click="deleteMessage(dataMessage.id)"
				class="fas ms-auto p-2 fa-times"
			></i>
		</div>
		<h3 class="h2 mt-3">{{ dataMessage.title }}</h3>
		<p>{{ dataMessage.content }}</p>
		<div v-if="hasImage" class="container-image-message">
			<img
				id="picture-message"
				:src="dataMessage.attachment"
				class="img-fluid image"
				alt="..."
			/>
		</div>
	</div>
</template>

<script>
import AuthManager from "../authManager";
import picture from "../assets/user_picture_default.png";
export default {
	name: "Message",
	data() {
		return {
			dataUserId: AuthManager.getUserId(),
			dataMessage: this.message,
			defaultPicture: picture,
			profilUrl: ``
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
	},
	beforeMount: function() {
		this.profilUrl = `profil/${this.dataMessage.userId}`;
	},
	mounted: function() {
		if (this.dataMessage.User.picture === null) {
			this.dataMessage.User.picture = this.defaultPicture
		}
	}
};
</script>

<style scoped>
.container {
	border-radius: 15px;
	box-shadow: 0px 5px 5px 3px rgba(66, 66, 66, 0.3);
}
#header-message {
	border-bottom: #978686 solid 1px;
}
.fas {
	color: #c62828;
}
.container-image-message {
	max-width: 300px;
	max-height: 300px;
	margin: auto;
}
#picture-profil {
	object-fit: cover;
	width: 100%;
	height: 100%;
	border-radius: 50%;
}
#picture-message {
	border-radius: 10px;
}
.container-image-profil {
	width: 50px;
	height: 50px;
	margin: 10px 0;
}
img {
	height: 100%;
	width: 100%;
	object-fit: contain;
}
#username-text {
	color: #637883;
	margin-left: 6px;
	margin-right: 5px;
}
</style>
