<template>
	<h1 class="mb-5">
		Bienvenue <span v-if="profilData.id != userIdLocal">chez</span> {{ profilData.username }}
	</h1>
	<div class="container-md  justify-content-around flex-wrap d-flex">
		<div id="container-profil-photo" class="d-flex p-4 pb-3 flex-column">
			<img id="image-user" :src="profilData.picture" alt="image utilisateur" />
			<div class="input-group mb-3">
				<input
					v-if="profilData.id == userIdLocal"
					type="file"
					@change="uploadPicture"
					class="form-control mt-3"
					id="pictureInput"
				/>
			</div>
			<button
				v-if="profilData.id == userIdLocal"
				@click="modifyPicture"
				id="btn-update-photo"
				class="btn btn-block"
			>
				Mettre à jour photo
			</button>
			<button
				v-if="profilData.id == userIdLocal"
				id="btn-delete-photo"
				v-show="displayBtn"
				@click="deletePicture"
				class="btn btn-danger btn-block my-3"
			>
				Supprimer photo
			</button>
		</div>
		<div class="d-flex col-lg-5 flex-column">
			<div v-if="profilData.bio" class="border my-3 rounded p-3 border-2 border-dark">
				{{ profilData.bio }}
			</div>
			<Button
				class="col-lg-5 align-self-center"
				v-if="!showAddBio && profilData.id == userIdLocal"
				@click="toggleAddBio"
				:text="text"
				color="#424242"
			/>
			<textarea
				v-if="showAddBio"
				v-model="bio"
				placeholder="Dites nous quelques mots sur vous ..."
				name="bio"
				id="bio"
				cols="20"
				rows="4"
				class="mt-3 form-control-lg"
			></textarea>

			<button
				id="btn-update-bio"
				v-if="showAddBio"
				@click="modifyBio"
				class="btn btn-block my-3 col-lg-5 align-self-center"
			>
				Mettre à jour biographie
			</button>
		</div>
	</div>
</template>

<script>
import picture from "../assets/user_picture_default.png";
import Button from "../components/Button.vue";
import AuthManager from "../authManager";

export default {
	name: "Profil",
	components: {
		Button
	},
	data() {
		return {
			text: "",
			showAddBio: "",
			defaultPicture: picture,
			profilData: "",
			targetFile: "",
			displayBtn: "",
			bio: "",
			userIdLocal: AuthManager.getUserId()
		};
	},
	methods: {
		toggleAddBio() {
			this.showAddBio = !this.showAddBio;
		},

		uploadPicture(event) {
			this.targetFile = event.target.files[0];
		},

		async modifyPicture() {
			const headerAuth = AuthManager.getAuthToken();
			const formData = new FormData();
			formData.append("image", this.targetFile);
			const res = await fetch("http://localhost:3000/api/auth/profils/myProfil/picture", {
				method: "PUT",
				headers: {
					Authorization: headerAuth
				},
				body: formData
			});
			if (res.status === 201) {
				const result = await res.json();
				this.profilData.picture = result;
				this.displayBtn = true;
			} else {
				alert("Image can't be modified");
			}
		},

		async deletePicture() {
			const headerAuth = AuthManager.getAuthToken();
			const res = await fetch("http://localhost:3000/api/auth/profils/myProfil/picture", {
				method: "DELETE",
				headers: {
					Authorization: headerAuth
				},
				body: picture
			});
			if (res.status === 200) {
				this.profilData.picture = this.defaultPicture;
				this.displayBtn = false;
			} else {
				alert("Image can't be deleted");
			}
		},

		async modifyBio() {
			const headerAuth = AuthManager.getAuthToken();
			const newBio = this.bio;
			const res = await fetch("http://localhost:3000/api/auth/profils/myProfil/bio", {
				method: "PUT",
				headers: {
					Authorization: headerAuth,
					"Content-type": "application/json"
				},
				body: JSON.stringify({ bio: newBio })
			});
			if (res.status === 201) {
				this.profilData.bio = newBio;
				this.showAddBio = !this.showAddBio;
			} else {
				alert("Bio can't be modified!");
			}
		}
	},
	beforeMount: function() {
		const headerAuth = AuthManager.getAuthToken();
		const url = document.location.href;
		const getUserId = url.split("/profil/");
		const userId = getUserId[1];
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
				console.log("data profil: ", data.profil);
				this.profilData = data.profil;
				if (this.profilData.picture === null) {
					this.profilData.picture = this.defaultPicture;
					this.displayBtn = false;
				} else {
					this.displayBtn = true;
				}
			})
			.catch(err => console.log(err));
	},
	beforeUpdate: function() {
		if (this.profilData !== null) {
			if (this.profilData.bio) {
				this.text = "Modifier votre bio";
			} else {
				this.text = "Ajouter votre bio";
			}
		}
	}
};
</script>

<style scoped>
button:hover,
input:hover {
	box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.3);
}
#container-profil-photo {
	background-color: #f8f9fa;
	border-radius: 20px;
	box-shadow: 0px 5px 5px 3px rgba(66, 66, 66, 0.3);
}
#btn-delete-photo {
	background-color: #c62828;
	color: white;
}
#btn-update-photo,
#btn-update-bio {
	background-color: #424242;
	color: white;
}
#image-user {
	border-radius: 20px;
	height: auto;
	box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.3);
}
img {
	object-fit: contain;
	width: 250px;
	height: 250px;
}
</style>
