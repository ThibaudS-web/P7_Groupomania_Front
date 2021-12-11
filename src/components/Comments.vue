<template>
	<div :key="comment" v-for="comment in comments">
		<Comment :comment="comment"  :color="color" @delete-comment="deleteComment" />
	</div>
</template>

<script>
import Comment from "./Comment.vue";
export default {
	name: "Comments",
	props: {
		comments: Array,
		color: String
	},
	data() {
		return {};
	},
	components: {
		Comment
	},
	methods: {
		deleteComment(id) {
			this.$emit("delete-comment", id);
		},

	},
	emits: ["delete-comment"]
};
</script>
