<script setup lang="ts">
	import type { Cat } from '@/types/cat'
	import { Icon } from '@iconify/vue'
	import Badge from './ui/badge/Badge.vue'
	import { onMounted, ref } from 'vue'
	import {
		addReaction,
		fetchReactions,
		removeReaction,
	} from '@/utils/api/api'
	import DropdownMenu from './ui/dropdown-menu/DropdownMenu.vue'
	import DropdownMenuTrigger from './ui/dropdown-menu/DropdownMenuTrigger.vue'
	import DropdownMenuContent from './ui/dropdown-menu/DropdownMenuContent.vue'
	import DropdownMenuItem from './ui/dropdown-menu/DropdownMenuItem.vue'
	import { toast } from 'vue-sonner'
	import ReactionView from '@/components/ReactionView.vue'
	import { useElementSize } from '@vueuse/core'

	interface Props {
		data: Cat
		catRatio?: number
	}

	const props = defineProps<Props>()
	const basePicUrl = import.meta.env.VITE_CDN_ADDR
	const validReactions = ref<string[]>([])
	const remainingReaction = ref<string[]>([])
	const catContainer = ref<HTMLDivElement | null>(null)
	const { width: catContainerWidth } = useElementSize(catContainer)

	const timeToString = (time: string) => {
		const date = new Date(time)
		return date.toLocaleString()
	}

	const updateRemainingReaction = () => {
		const currentReactions = props.data.reactions.map(
			reaction => reaction.emoji
		)
		remainingReaction.value = validReactions.value.filter(
			reaction => !currentReactions.includes(reaction)
		)
	}

	const onReactionClick = async (reaction: string) => {
		const r = props.data.reactions.find(r => r.emoji === reaction)
		if (r) {
			if (r.is_reacted) {
				r.is_reacted = false
				try {
					await removeReaction(props.data.uuid, reaction)
					r.count = r.count - 1
					if (r.count === 0) {
						props.data.reactions = props.data.reactions.filter(
							r => r.emoji !== reaction
						)
						updateRemainingReaction()
					}

					toast.info(`Removed ${reaction}`)
				} catch (e) {
					toast.error('Failed to add reaction')
					r.is_reacted = true
				}
			} else {
				r.is_reacted = true
				try {
					await addReaction(props.data.uuid, reaction)
					r.count = r.count + 1
					toast.success(`Added ${reaction}`)
				} catch (e) {
					toast.error('Failed to add reaction')
					r.is_reacted = false
				}
			}
		} else {
			const rea = {
				emoji: reaction,
				count: 1,
				is_reacted: false,
			}
			const insertIdx = props.data.reactions.length
			try {
				props.data.reactions.push(rea)
				await addReaction(props.data.uuid, reaction)
				props.data.reactions[insertIdx] = { ...rea, is_reacted: true }
				updateRemainingReaction()
				toast.success(`Added ${reaction}`)
			} catch (e) {
				toast.error('Failed to add reaction')
				props.data.reactions.splice(insertIdx)
			}
		}
	}

	onMounted(async () => {
		validReactions.value = await fetchReactions()
		updateRemainingReaction()
	})
</script>

<template>
	<div class="flex items-start flex-wrap gap-4" v-bind="$attrs">
		<div
			class="relative flex items-center justify-center flex-[2] min-w-48"
			ref="catContainer"
		>
			<img
				v-lazy="`${basePicUrl}/${props.data.image}`"
				alt="Cat Image"
				class="object-contain max-w-42"
				:style="
					typeof catRatio === 'number' && catRatio > 0
						? `height: ${catContainerWidth / catRatio}px`
						: ''
				"
			/>
		</div>
		<div class="flex-1 flex flex-wrap gap-2 items-start">
			<div class="space-y-2 min-w-52">
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
					<span class="ml-2 font-semibold">{{
						props.data.caption
					}}</span>
				</div>
			</div>
			<div class="flex-grow flex flex-row gap-1 flex-wrap">
				<DropdownMenu v-if="remainingReaction?.length !== 0">
					<ReactionView
						v-for="r in data.reactions"
						:value="r"
						@click="onReactionClick"
					/>
					<DropdownMenuTrigger as-child>
						<Badge class="h-6 text-lg hover:cursor-pointer">
							+
						</Badge>
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
	</div>
</template>
