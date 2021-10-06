<template>
	<div class="body-background">
		<div class="container-fluid d-flex justify-content-center align-items-center h-100">
			<div class="card p-3 text-center py-4">
				<h4>Sign in</h4>
				<div>
					<span>Don't have an account?</span>
					<NavLink url="/signup" text="Sign Up" />
				</div>

				<div class="mt-3 px-3">
					<input v-model="email" class="form-control" placeholder="E-mail" />
				</div>

				<div class="input-group px-3 mt-3">
					<input
						v-model="password"
						type="text"
						class="form-control"
						placeholder="Password"
						aria-label="Password"
					/>
				</div>
				<Button @click="processForm" content="Sign in" />
			</div>
		</div>
	</div>
</template>

<script>
import Button from "../components/Button.vue";
import NavLink from "../components/NavLink.vue";
export default {
	data() {
		return {
			email: "",
			password: ""
		};
	},
	components: {
		Button,
		NavLink
	},
	methods: {
		//Testing form ...
		processForm: function() {
			console.log({ email: this.email, password: this.password });
		}
	}
};
</script>
