<script setup lang="ts">
import type { Cat } from "@/types/cat";
import { Icon } from "@iconify/vue";
import Card from "./ui/card/Card.vue";
import CardContent from "./ui/card/CardContent.vue";
import CardFooter from "./ui/card/CardFooter.vue";
import { computed } from "vue";
import SolarStickerSmileCircleLinear from "./icon/SolarStickerSmileCircleLinear.vue";

interface Props {
	data: Cat;
}

const props = defineProps<Props>();
const basePicUrl = import.meta.env.VITE_CDN_ADDR;
const totalReactions = computed(() =>
	props.data.reactions.reduce((acc, reaction) => acc + reaction.count, 0)
);

const timeToString = (time: string) => {
	const date = new Date(time);
	return date.toLocaleString();
};
</script>
<template>
	<Card class="flex-1 w-auto h-auto">
		<CardContent>
			<div
				class="relative flex items-center justify-center max-w-full max-h-full mt-4 overflow-hidden min-w-[20rem]"
			>
				<img
					v-lazy="`${basePicUrl}/${props.data.thumbnail}`"
					alt="Cat Image"
					class="object-contain h-[20rem]"
				/>
			</div>
		</CardContent>
		<CardFooter>
			<div class="flex flex-col w-full gap-1 my-4">
				<div class="flex flex-row items-center">
					<Icon icon="mdi:clock-outline" class="h-[1rem] w-[1rem]" />
					<span class="ml-2 font-semibold">{{
						timeToString(props.data.created_at)
					}}</span>
				</div>
				<div
					v-if="props.data.caption.length"
					class="flex flex-row items-center"
				>
					<Icon icon="ph:chat-bold" class="h-[1rem] w-[1rem]" />
					<span class="ml-2 font-semibold">{{ props.data.caption }}</span>
				</div>
				<div v-else class="mt-6"></div>
				<div v-if="totalReactions > 0" class="flex flex-row items-center">
					<SolarStickerSmileCircleLinear class="h-[1rem] w-[1rem]" />
					<span class="ml-2 font-semibold">{{ totalReactions }}</span>
				</div>
			</div>
		</CardFooter>
	</Card>
</template>
