<template>
	<form
		id="form"
		enctype="multipart/form-data"
		submit="onSubmit"
		class="container col-xxl-4 col-lg-5 col-md-6"
	>
		<div class="mb-3">
			<label for="title" class="form-label">Titre</label>
			<input
				name="title"
				v-model="title"
				type="text"
				class="form-control"
				placeholder="title"
				id="title"
			/>
		</div>
		<div class="mb-3">
			<label for="message" class="form-label">Message</label>
			<textarea
				name="content"
				v-model="content"
				placeholder="Quoi de neuf..."
				class="form-control"
				id="message"
				rows="3"
			></textarea>
		</div>
		<div class="mb-3">
			<label for="formFile" class="form-label">Choisissez votre image...</label>
			<input
				class="form-control"
				type="file"
				id="formFile"
				@change="previewFiles"
				name="attachment"
			/>
		</div>
		<input
			id='btn-submit-message'
			@click="onSubmit"
			type="submit"
			value="Envoyez votre message"
			class="btn btn-block"
		/>
	</form>
</template>

<script>
export default {
	name: "AddMessage",
	data() {
		return {
			title: "",
			content: "",
			attachment: ""
		};
	},
	methods: {
		onSubmit(e) {
			e.preventDefault();
			if (!this.content) {
				alert("Ajoutez un contenu à votre message");
				return;
			}

			if (!this.title) {
				alert("Ajoutez un titre à votre message");
				return;
			}

			const newMessage = {
				title: this.title,
				content: this.content,
				attachment: this.attachment
			};

			this.$emit("add-message", newMessage);

			this.title = "";
			this.content = "";
			this.attachment = "";
		},
		previewFiles(event) {
			this.attachment = event.target.files[0]
			console.log(this.attachment);
		}
	}
};
</script>

<style scoped>
#btn-submit-message {
	background-color: #424242;
	color: white;
}
form {
	background-color: #f8f9fa;
	padding: 20px;
	border-radius: 20px;
	margin-bottom: 20px;
	box-shadow: 0px 5px 5px 3px rgba(66, 66, 66, 0.1);
}
</style>
