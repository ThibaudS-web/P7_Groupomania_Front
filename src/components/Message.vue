<template>
	<div
		class="container col-xxl-5 col-xl-6 col-lg-7 col-md-8 bg-light bg-gradient mb-5 pb-4 pt-2 px-4"
	>
		<div id="header-message" class="d-flex">
			<div class="container-image-profil">
				<a :href="authorMessageUrl">
					<img
						id="picture-profil"
						:src="dataMessage.User.picture"
						class="align-self-center"
						alt="Photo de l'auteur du message"
					/>
				</a>
			</div>
			<h2 id="username-text" class="h6  align-self-center">
				Crée par {{ dataMessage.User.username }}
			</h2>
			<div class="d-flex ms-auto p-2 flex-column justify-content-between">
				<i
					v-if="dataUserId == dataMessage.userId || admin"
					@click="deleteMessage(dataMessage.id)"
					class="fas  fa-times"
					type="button"
					aria-label="Supprimer le message"
				></i>
				<i
					v-if="dataUserId == dataMessage.userId"
					class="fas fa-pen"
					@click="toggleModifyContent"
					type="button"
					title="Modifier le message"
				></i>
			</div>
		</div>
		<h3 class="h2 mt-3">{{ dataMessage.title }}</h3>
		<p v-if="!showUpdateContent">{{ dataMessage.content }}</p>
		<div class="d-flex">
			<input
				v-if="showUpdateContent"
				name="contentMessage"
				:value="dataMessage.content"
				id="content-message-input"
			/>
			<i
				v-if="showUpdateContent"
				@click="updateMessage(dataMessage.id)"
				class="ms-auto p-2 fas fa-share"
				type="button"
			></i>
		</div>
		<div
			v-if="showUpdateContent"
			@click="toggleModifyContent"
			id="cancel"
			class="mb-3 align-content-start"
		>
			Cliquer pour <span>Annuler</span>
		</div>
		<div v-if="hasImage" class="container-image-message">
			<img
				id="picture-message"
				:src="dataMessage.attachment"
				class="img-fluid image"
				alt="Une image dans le message"
			/>
		</div>
		<div id="footer-message" class="mt-3 d-flex">
			<i
				type="button"
				@click="toggleComment"
				id="btn-comment"
				class="far fa-comment-alt mt-3"
			>
				Commenter</i
			>
		</div>
		<div id="add-comment" v-if="showComment" class="mt-3 d-flex">
			<div class="container-image-profil">
				<a :href="profilUrl">
					<img
						id="picture-profil"
						:src="ProfilPicture"
						class="align-self-center"
						alt="Photo de l'auteur du commentaire"
					/>
				</a>
			</div>
			<input
				v-model="contentComment"
				class="rounded-pill m-3 px-3"
				placeholder="Écrivez un commentaire..."
			/>
			<i @click="addComment" type="button" class="fas fa-share align-self-center"></i>
		</div>
		<Comments
			v-if="showComment"
			:color="color"
			:comments="comments"
			@delete-comment="deleteComment"
		/>
	</div>
</template>

<script>
import AuthManager from "../AuthManager";
import picture from "../assets/user_picture_default.png";
import Comments from "./Comments.vue";
export default {
	name: "Message",
	data() {
		return {
			dataUserId: AuthManager.getUserId(),
			dataMessage: this.message,
			ProfilPicture: "",
			defaultPicture: picture,
			admin: "",
			profilUrl: ``,
			showUpdateContent: "",
			showComment: "",
			comments: this.message.Comments,
			contentComment: "",
			color: ""
		};
	},
	props: {
		message: Object
	},
	components: {
		Comments
	},
	methods: {
		async addComment() {
			const comment = {
				content: this.contentComment,
				userId: AuthManager.getUserId(),
				messageId: this.dataMessage.id
			};
			const headerAuth = AuthManager.getAuthToken();
			const res = await fetch("http://localhost:3000/api/comments", {
				method: "POST",
				headers: {
					"Content-type": "application/json",
					Authorization: headerAuth
				},
				body: JSON.stringify(comment)
			});
			if (res.status === 201) {
				const result = await res.json();
				this.dataMessage.Comments.push(result);
				this.contentComment = "";
			} else {
				alert("Comment cannot be sent!");
			}
		},
		async updateMessage(id) {
			const contentMessage = document.getElementById("content-message-input");
			const headerAuth = AuthManager.getAuthToken();
			const newContent = contentMessage.value;
			const res = await fetch(`http://localhost:3000/api/messages/${id}`, {
				method: "PUT",
				headers: {
					"Content-type": "application/json",
					Authorization: headerAuth
				},
				body: JSON.stringify({ content: newContent })
			});
			if (res.status === 201) {
				this.dataMessage.content = newContent;
				this.toggleModifyContent();
			} else {
				alert("content can't be modified!");
			}
		},
		async deleteComment(id) {
			const headerAuth = AuthManager.getAuthToken();
			const res = await fetch(`http://localhost:3000/api/comments/${id}`, {
				method: "DELETE",
				headers: {
					"Content-type": "application/json",
					Authorization: headerAuth
				}
			});
			if (res.status === 200) {
				let findCommentIndex = this.dataMessage.Comments.findIndex(
					comment => comment.id == id
				);
				this.dataMessage.Comments.splice(findCommentIndex, 1);
			} else {
				alert("Error deleting");
			}
		},
		deleteMessage(id) {
			this.$emit("delete-message", id);
		},
		toggleModifyContent() {
			this.showUpdateContent = !this.showUpdateContent;
		},
		toggleComment() {
			this.showComment = !this.showComment;
		}
	},
	computed: {
		hasImage() {
			return this.dataMessage.attachment !== null;
		}
	},
	beforeMount: function() {
		const headerAuth = AuthManager.getAuthToken();
		const userId = AuthManager.getUserId();
		this.authorMessageUrl = `profil/${this.dataMessage.userId}`;
		this.profilUrl = `profil/${userId}`;
		fetch(`http://localhost:3000/api/auth/profils/${userId}`, {
			method: "GET",
			headers: {
				"Content-type": "application/json",
				Authorization: headerAuth
			}
		})
			.then(res => {
				if (res.status === 200) {
					return res.json();
				} else {
					throw "Profil Not Found";
				}
			})
			.then(data => {
				if (data.profil.picture) {
					this.ProfilPicture = data.profil.picture;
				} else {
					this.ProfilPicture = "/img/user_picture_default.dc8b1732.png";
				}
				this.admin = data.profil.isAdmin;
			})
			.catch(err => console.log(err));
	},
	mounted: function() {
		if (this.dataMessage.User.picture === null) {
			this.dataMessage.User.picture = this.defaultPicture;
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
	color: rgb(198 40 40);
	font-size: 15px;
}
.fa-pen,
.fa-share {
	color: #424242;
}
#cancel > span {
	color: rgb(21, 101, 192);
}
#cancel > span:hover {
	text-decoration: underline;
	cursor: pointer;
}
#content-message-input {
	width: 100%;
	border-radius: 10px;
	border: 1px #978686 solid;
}
.container-image-message {
	max-width: 300px;
	max-height: 100%;
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
#username-text,
#cancel {
	color: #637883;
	margin-left: 6px;
	margin-right: 5px;
}
#footer-message {
	border-top: 1px #978686 solid;
}
#btn-comment:hover {
	font-weight: bold;
}
#add-comment {
	border-top: 1px #978686 solid;
}
#add-comment > input {
	border: none;
	border-color: #978686;
	background-color: #e4e6eb;
	width: 80%;
}
#area-comment {
	height: auto;
	max-width: 80%;
	padding: 10px 12px 10px 12px;
	background-color: #e4e6eb;
}
#area-comment > span {
	color: black;
	font-weight: bold;
}

@media (max-width: 576px) {
	.container{
		border-radius: 0;
	}
}
</style>
