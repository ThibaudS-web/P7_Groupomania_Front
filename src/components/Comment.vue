<template>
	<div id="container-comment" class="rounded-pill mt-3 d-flex">
		<div class="container-image-profil">
			<a :href="profilUrl">
				<img
					id="picture-profil"
					:src="dataComment.User.picture"
					alt="Photo de l'auteur du commentaire"
				/>
			</a>
		</div>
		<div class="d-flex flex-column" id="comment-span">
			<div id="area-comment" class="d-flex flex-column mx-3 rounded">
				<span class="align-self-start">{{ dataComment.User.username }}</span>
				<div id='area-text' v-if="!toggleUpdateInput" class="text-start">
					{{ dataComment.content }}
				</div>
				<input
					id="content-comment-input"
					:value="dataComment.content"
					class="rounded-pill"
					v-if="toggleUpdateInput"
				/>
			</div>

			<div v-if="dataComment.userId == userId" class="d-flex ms-3">
				<div id="actions-comment">
					Cliquer pour
					<span @click="toggleUpdate">Modifier</span>
					ou
					<span @click="deleteComment(dataComment.id)">Supprimer</span>
				</div>
			</div>
		</div>
		<i
			v-if="showSendPicture"
			@click="updateComment(dataComment.id)"
			type="button"
			class="fas fa-check align-self-center"
		></i>
	</div>
</template>

<script>
import AuthManager from "../AuthManager";
import authManager from "../AuthManager";
export default {
	name: "Comment",
	data() {
		return {
			dataComment: this.comment,
			UserUrl: this.profilUrl,
			toggleUpdateInput: false,
			showSendPicture: false,
			userId: AuthManager.getUserId()
		};
	},
	props: {
		comment: Object,
		profilUrl: String
	},
	methods: {
		toggleUpdate() {
			this.showSendPicture = !this.showSendPicture;
			this.toggleUpdateInput = !this.toggleUpdateInput;
		},
		deleteComment(id) {
			this.$emit("delete-comment", id);
		},
		async updateComment(id) {
			const contentComment = document.getElementById("content-comment-input");
			const headerAuth = authManager.getAuthToken();
			const newComment = contentComment.value;
			
			const res = await fetch(`http://localhost:3000/api/comments/${id}`, {
				method: "PUT",
				headers: {
					"Content-type": "application/json",
					Authorization: headerAuth
				},
				body: JSON.stringify({ content: newComment })
			});
			if (res.status === 201) {
				this.dataComment.content = newComment;
				this.toggleUpdate()
			} else {
				alert("Content can't be modified!");
			}
		}
	},
};
</script>

<style scoped>
#actions-comment {
	color: #637883;
}
#actions-comment > span {
	color: rgb(21 101 192);
}
#actions-comment > span:hover {
	text-decoration: underline;
	cursor: pointer;
}
#comment-span {
	max-width: 75%;
}
#picture-profil {
	object-fit: cover;
	width: 100%;
	height: 100%;
	border-radius: 50%;
}
.container-image-profil {
	width: 50px;
	height: 50px;
	margin: 10px 0;
}
#area-comment {
	height: auto;
	max-width: 100%;
	padding: 10px 12px 10px 12px;
	background-color: #e4e6eb;
}
#area-comment > span {
	color: black;
	font-weight: bold;
}
#area-text {
	overflow-wrap: break-word;
}
</style>
