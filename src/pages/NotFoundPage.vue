<script setup lang="ts">
	import { Icon } from '@iconify/vue'
	import { Button } from '@/components/ui/button'

	function goBack() {
		window.history.back()
	}
</script>

<template>
	<div class="flex w-full h-[80vh] items-center justify-center flex-col">
		<div class="flex justify-center w-full my-2">
			<Icon icon="noto-v1:thinking-face" class="w-[10rem] h-[10rem]" />
		</div>
		<div class="flex flex-col justify-center w-full my-2">
			<p class="text-2xl font-semibold text-center dark:text-gray-100">
				Nothing here...
			</p>
			<p class="text-lg text-center text-gray-500 dark:text-gray-400">
				Looks like this kitty wandered too far from home!
			</p>
		</div>
		<div class="flex items-center justify-center w-full my-2">
			<Button class="items-center" @click="goBack">
				<Icon icon="ion:chevron-back" class="mr-2 size-4" />
				<div>Go back</div>
			</Button>
		</div>
	</div>
</template>
