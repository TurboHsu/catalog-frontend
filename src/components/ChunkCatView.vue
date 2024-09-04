<script setup lang="ts">
import type { Cat } from "@/types/cat";
import { Icon } from "@iconify/vue";

interface Props {
	data: Cat;
}

const props = defineProps<Props>();
const basePicUrl = import.meta.env.VITE_CDN_ADDR;

const timeToString = (time: string) => {
	const date = new Date(time);
	return date.toLocaleString();
};
</script>
<template>
	<div
		class="relative flex items-center justify-center max-w-full max-h-full mt-4 overflow-hidden"
	>
		<img
			v-lazy="`${basePicUrl}/${props.data.image}`"
			alt="Cat Image"
			class="object-contain max-h-[60vh] w-auto"
		/>
	</div>
	<div class="flex flex-col w-full gap-1 my-4">
		<div class="flex flex-row items-center">
			<Icon icon="mdi:clock-outline" class="h-[1rem] w-[1rem]" />
			<span class="ml-2 font-semibold">{{
				timeToString(props.data.created_at)
			}}</span>
		</div>
		<div v-if="props.data.caption.length" class="flex flex-row items-center">
			<Icon icon="ph:chat-bold" class="h-[1rem] w-[1rem]" />
			<span class="ml-2 font-semibold">{{ props.data.caption }}</span>
		</div>
		<div v-else class="mt-6"></div>
	</div>
</template>
