<script setup lang="ts">
	import { computed, type HTMLAttributes, ref } from 'vue'
	import {
		ScrollAreaCorner,
		ScrollAreaRoot,
		type ScrollAreaRootProps,
		ScrollAreaViewport,
	} from 'radix-vue'
	import ScrollBar from './ScrollBar.vue'
	import { cn } from '@/lib/utils'
	import { useScroll } from '@vueuse/core'

	const props = defineProps<
		ScrollAreaRootProps & { class?: HTMLAttributes['class'] }
	>()

	const delegatedProps = computed(() => {
		const { class: _, ...delegated } = props

		return delegated
	})

	const viewport = ref<{ viewportElement: HTMLDivElement } | null>(null)
	const scrollingElement = computed(() => viewport.value?.viewportElement)
	const { y: viewportScroll } = useScroll(scrollingElement)
	const scrollToBottom = computed(() =>
		scrollingElement.value
			? viewportScroll.value + scrollingElement.value.clientHeight >=
			  scrollingElement.value.scrollHeight
			: false
	)
	const scrollToTop = computed(() =>
		scrollingElement?.value ? viewportScroll.value <= 0 : false
	)
</script>

<template>
	<ScrollAreaRoot
		v-bind="delegatedProps"
		:class="cn('relative', props.class)"
	>
		<ScrollAreaViewport
			ref="viewport"
			class="h-full w-full rounded-[inherit]"
		>
			<slot />
		</ScrollAreaViewport>
		<div
			class="aria-disabled:opacity-0 opacity-100 transition-opacity absolute top-[-1px] left-0 pointer-events-none w-full h-full bg-gradient-to-b from-background from-0% to-10%"
			:aria-disabled="scrollToTop"
		/>
		<div
			class="aria-disabled:opacity-0 opacity-100 absolute top-[1px] left-0 pointer-events-none w-full h-full bg-gradient-to-t from-background from-0% to-10%"
			:aria-disabled="scrollToBottom"
		/>
		<ScrollBar />
		<ScrollAreaCorner />
	</ScrollAreaRoot>
</template>
