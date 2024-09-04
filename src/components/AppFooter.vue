<script setup lang="ts">
const currentYear = new Date().getFullYear();
const footerLink = import.meta.env.VITE_APP_FOOTER_LINK;
const footer = import.meta.env.VITE_APP_FOOTER;
</script>

<template>
	<footer
		class="bottom-0 z-40 flex flex-col flex-1 gap-3 overflow-hidden border-t bg-background/80 backdrop-blur-lg border-border md:flex-row"
	>
		<div
			class="container flex flex-col items-center flex-grow md:flex-row h-14 max-w-screen-2xl"
		>
			<span class="mx-2">NekoMeow © {{ currentYear }} TurboHsu</span>
			<span class="hidden md:flex">|</span>
			<span class="mx-2">All Rights Reserved</span>
		</div>
		<div
			class="container flex items-center justify-center space-x-2 whitespace-nowrap md:justify-end"
		>
			<a :href="footerLink">{{ footer }}</a>
		</div>
	</footer>
</template>
