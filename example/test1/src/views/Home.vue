<template>
	<div class="home">
		<img class="test1" alt="Vue logo" src="../assets/logo.png" />
		<HelloWorld class="test4" msg="Welcome to Your Vue.js App" />
	</div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
	name: 'Home',
	components: {
		HelloWorld,
	},
}
</script>
