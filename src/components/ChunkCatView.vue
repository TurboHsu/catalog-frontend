<script setup lang="ts">
import { ref } from "vue";
import type { Cat } from "@/types/cat";
import { Icon } from "@iconify/vue";

interface Props {
	data: Cat;
}

const props = defineProps<Props>();
const basePicUrl = import.meta.env.VITE_CDN_ADDR;
const loaded = ref<boolean>(false);

const timeToString = (time: string) => {
	const date = new Date(time);
	return date.toLocaleString();
};

const handleImageLoad = () => {
	loaded.value = true;
};
</script>
<template>
	<div
		class="relative flex items-center justify-center max-w-full max-h-full mt-4 overflow-hidden"
	>
		<img
			:src="`${basePicUrl}/${props.data.image}`"
			@load="handleImageLoad()"
			alt="Cat Image"
			class="object-contain max-h-[60vh] w-auto"
		/>
		<Icon
			v-if="!loaded"
			icon="fa6-solid:cat"
			class="h-[4rem] w-[4rem] z-10 animate-pulse absolute"
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
