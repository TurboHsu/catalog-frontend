<script setup lang="ts">
	import { Reaction } from '@/types/cat.ts'
	import Badge from './ui/badge/Badge.vue'

	interface Props {
		value: Reaction
		disabled?: boolean
	}

	interface Emits {
		(e: 'click', emoji: string): void
	}

	defineProps<Props>()
	defineEmits<Emits>()
</script>

<template>
	<Badge
		:variant="
			disabled ? 'outline' : value.is_reacted ? 'default' : 'secondary'
		"
		:data-enabled="!Boolean(disabled)"
		class="h-6 flex items-center gap-2 data-[enabled=true]:hover:cursor-pointer"
		@click="$emit('click', value.emoji)"
	>
		<div class="text-lg">{{ value.emoji }}</div>
		<div>{{ value.count }}</div>
	</Badge>
</template>

<style scoped></style>
