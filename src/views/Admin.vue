<template>
	<h1>Gérer les utilisateurs</h1>
	<div class="container col-lg-10 mt-5">
		<table class="table ">
			<thead>
				<tr>
					<th scope="col">id</th>
					<th scope="col">Nom d'utilisateur</th>
					<th scope="col">Email</th>
					<th scope="col ">Supprimer</th>
				</tr>
			</thead>

			<tbody>
				<tr :key="user" v-for="user in users">
					<td class="fw-bold">{{ user.id }}</td>
					<td>{{ user.username }}</td>
					<td>{{ user.email }}</td>
					<td>
						<i @click="deleteUser(user.id)" type="button" class="fas fa-times"></i>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
// import AuthManager from "../AuthManager.js";
import { apiClient } from "../services/ApiClient.js";
export default {
	name: "Admin",
	data() {
		return {
			users: []
		};
	},
	emits: ["signin-success"],
	beforeMount: function() {
		apiClient.getAllUsers()
		.then(profils => {
			this.users = profils
		})
		.catch(err => console.log(err));
	},
	methods: {
		async deleteUser(id) {
			if (confirm("Are you sure to delete this user?")) {
				apiClient.deleteUser(id).then(response => {
					if (response.status === 200) {
						let findUserIndex = this.users.findIndex(user => user.id == id);
						this.users.splice(findUserIndex, 1);
					} else {
						alert("Error deleting");
					}
				})
			}
		}
	}
};
</script>

<style scoped>
.fas {
	color: #c62828;
	font-size: 20px;
}

@media (max-width: 424px) {
	.container {
		overflow-x: scroll;
	}
}
</style>
