<template>
	<div id="app">
		<Content />
	</div>
</template>

<script>
import Content from "@/components/content.vue";
export default {
	components: {
		Content,
	},
};
</script>
<style src="@/assets/reset.css">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

nav {
	padding: 30px;
}

nav a {
	font-weight: bold;
	color: #2c3e50;
}

nav a.router-link-exact-active {
	color: #42b983;
}
</style>
