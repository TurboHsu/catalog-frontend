<script setup lang="ts">
import type { Cat } from "@/types/cat";
import { Icon } from "@iconify/vue";
import Badge from "./ui/badge/Badge.vue";
import { onMounted, ref } from "vue";
import { addReaction, fetchReactions, removeReaction } from "@/utils/api/api";
import DropdownMenu from "./ui/dropdown-menu/DropdownMenu.vue";
import DropdownMenuTrigger from "./ui/dropdown-menu/DropdownMenuTrigger.vue";
import DropdownMenuContent from "./ui/dropdown-menu/DropdownMenuContent.vue";
import DropdownMenuItem from "./ui/dropdown-menu/DropdownMenuItem.vue";
import { toast } from "vue-sonner";

interface Props {
	data: Cat;
}

const props = defineProps<Props>();
const basePicUrl = import.meta.env.VITE_CDN_ADDR;
const validReactions = ref<string[]>([]);
const remainingReaction = ref<string[]>([]);

const timeToString = (time: string) => {
	const date = new Date(time);
	return date.toLocaleString();
};

const updateRemainingReaction = () => {
	const currentReactions = props.data.reactions.map(
		(reaction) => reaction.emoji
	);
	remainingReaction.value = validReactions.value.filter(
		(reaction) => !currentReactions.includes(reaction)
	);
};

const onReactionClick = async (reaction: string) => {
	const r = props.data.reactions.find((r) => r.emoji === reaction);
	if (r) {
		if (r.is_reacted) {
			try {
				await removeReaction(props.data.uuid, reaction);
				r.is_reacted = false;
				r.count = r.count - 1;
				if (r.count === 0) {
					props.data.reactions = props.data.reactions.filter(
						(r) => r.emoji !== reaction
					);
					updateRemainingReaction();
				}

				toast.info(`Removed ${reaction}`);
			} catch (e) {
				toast.error("Failed to add reaction");
			}
		} else {
			try {
				await addReaction(props.data.uuid, reaction);
				r.is_reacted = true;
				r.count = r.count + 1;
				toast.success(`Added ${reaction}`);
			} catch (e) {
				toast.error("Failed to add reaction");
			}
		}
	} else {
		try {
			await addReaction(props.data.uuid, reaction);
			props.data.reactions.push({
				emoji: reaction,
				count: 1,
				is_reacted: true,
			});
			updateRemainingReaction();
			toast.success(`Added ${reaction}`);
		} catch (e) {
			toast.error("Failed to add reaction");
		}
	}
}

onMounted(async () => {
	validReactions.value = await fetchReactions();
	updateRemainingReaction();
});
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
	<div class="flex md:flex-row flex-col w-full">
		<div class="flex flex-col flex-1 gap-1 my-4">
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
		<div class="flex flex-row gap-1 flex-wrap md:max-w-96">
			<Badge
				v-for="r in props.data.reactions"
				:variant="r.is_reacted ? 'default' : 'secondary'"
				class="h-6 flex items-center gap-2 hover:cursor-pointer"
				@click="onReactionClick(r.emoji)"
			>
				<div class="text-lg">{{ r.emoji }}</div>
				<div>{{ r.count }}</div>
			</Badge>
			<DropdownMenu v-if="remainingReaction?.length !== 0">
				<DropdownMenuTrigger as-child>
					<Badge class="h-6 text-lg hover:cursor-pointer"> + </Badge>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem
					v-for="r in remainingReaction"
					class="text-lg flex items-center justify-center"
					@click="onReactionClick(r)"
					>
					{{ r }}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
		</div>
	</div>
</template>
