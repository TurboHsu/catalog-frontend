<script setup lang="ts">
	import AppHeader from './components/AppHeader.vue'
	import AppFooter from './components/AppFooter.vue'
	import { Toaster } from './components/ui/sonner'
	import { RouterView } from 'vue-router'
</script>

<template>
	<AppHeader />
	<RouterView />
	<AppFooter />
	<Toaster />
</template>
