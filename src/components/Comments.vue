<template>
	<div :key="comment" v-for="comment in comments">
		<Comment :comment="comment" :profilUrl="profilUrl" @update-comment='updateComment' @delete-comment="deleteComment" />
	</div>
</template>

<script>
import Comment from "./Comment.vue";
export default {
	name: "Comments",
	props: {
		comments: Array,
		profilUrl: String
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
		}
	}
};
</script>
