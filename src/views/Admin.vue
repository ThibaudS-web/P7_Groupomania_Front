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
						<i
							v-if="!user.isAdmin"
							@click="deleteUser(user.id)"
							type="button"
							class="fas fa-times"
						></i>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import AuthManager from "../AuthManager.js";
export default {
	name: "Admin",
	data() {
		return {
			users: []
		};
	},
	emits: ["signin-success"],
	beforeMount: function() {
		const headerAuth = AuthManager.getAuthToken();
		fetch("http://localhost:3000/api/auth/profils", {
			method: "GET",
			headers: {
				"Content-type": "application/json",
				Authorization: headerAuth
			}
		})
			.then(res => {
				if (res.status == 200) {
					return res.json();
				} else {
					throw "Messages cannot be found!";
				}
			})
			.then(profils => {
				this.users = profils;
			})
			.catch(err => console.log(err));
	},
	methods: {
		async deleteUser(id) {
			const headerAuth = AuthManager.getAuthToken();
			if (confirm("Are you sure to delete this user?")) {
				const res = await fetch(`http://localhost:3000/api/auth/profils/${id}`, {
					method: "DELETE",
					headers: {
						"Content-type": "application/json",
						Authorization: headerAuth
					}
				});
				if (res.status === 200) {
					let findUserIndex = this.users.findIndex(user => user.id == id);
					this.users.splice(findUserIndex, 1);
				} else {
					alert("Error deleting");
				}
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
