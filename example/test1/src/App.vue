<template>
	<div id="app">
		<div id="nav">
			<router-link to="/">Home</router-link> |
			<router-link to="/about">About</router-link>|
			<router-link to="/about?wfrf=afgrwg">About1</router-link>
		</div>
		<router-view />
	</div>
</template>
<script>
import Guide from '../../../dist/guide.js'
export default {
	mounted() {
		const guide = new Guide({}).addAllSteps({
			'/': [
				{
					el: '.test1',
					content: 'test',
					width: 410,
					height: 198,
				},
				{
					el: '.test12',
					content: 'test',
					width: 410,
					height: 198,
				},
				{
					el: '.test13',
					content: 'test',
					width: 410,
					height: 198,
				},
			],
			'/about': [
				{
					el: '.test1',
					content: 'test',
					width: 410,
					height: 198,
				},
				{
					el: '.test12',
					content: 'test',
					width: 410,
					height: 198,
				},
				{
					el: '.test13',
					content: 'test',
					width: 410,
					height: 198,
				},
			],
		})
		console.log(guide)
		// setTimeout(() => {
		// 	guide.exit()
		// }, 5000)
	},
}
</script>
<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

#nav {
	padding: 30px;

	a {
		font-weight: bold;
		color: #2c3e50;

		&.router-link-exact-active {
			color: #42b983;
		}
	}
}
</style>
