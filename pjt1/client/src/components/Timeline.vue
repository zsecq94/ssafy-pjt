<template>
	<div>		
		<v-btn
		@click="goWorldcup"
		elevation="2"
		>월드컵 다시하기</v-btn>
	</div>
</template>

<script>
export default {
	name: "timeline",
	props: {
		my_movies: {
			type:Array
		}
	},
	methods: {
		goWorldcup() {
			this.$router.push({ name: 'worldcup' })
		}
	},
};
</script>

<style>
</style>