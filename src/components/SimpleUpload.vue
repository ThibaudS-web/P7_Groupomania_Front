<template>
	<div class="file is-boxed is-primary">
		<label for="file" class="file-label">

			<input type="file" ref="file" @change="selectFile" class="file-input" />

			<span class="file-cta">
				<span class="file-icon">
					<i class="fas fa-upload"></i>
				</span>
				<span class="file-label">
					Choisissez une image...
				</span>
			</span>

		</label>
	</div>
</template>

<script>
import axios from "axios";
export default {
	name: "SimpleUpload",
	data() {
		return {
			file: ""
		};
	},
	methods: {
		selectFile() {
			this.file = this.$refs.file.files[0];
		},
		async sendFile() {
			const formData = new formData();
			formData.append("file", this.file);

			try {
				await axios.post("http://localhost:3000/api/messages", formData);
			} catch (err) {
				console.log(err);
			}
		}
	}
};
</script>
