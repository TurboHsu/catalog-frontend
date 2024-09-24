<script setup lang="ts">
import type {Cat} from "@/types/cat";
import {Icon} from "@iconify/vue";
import Card from "./ui/card/Card.vue";
import CardContent from "./ui/card/CardContent.vue";
import CardFooter from "./ui/card/CardFooter.vue";
import ReactionView from "@/components/ReactionView.vue";

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
            <div class="flex flex-col w-full gap-1">
                <div class="flex flex-row items-center">
                    <Icon icon="mdi:clock-outline" class="h-[1rem] w-[1rem]"/>
                    <span class="ml-2 font-semibold">{{
                            timeToString(props.data.created_at)
                        }}</span>
                </div>
                <div
                    v-if="props.data.caption.length"
                    class="flex flex-row items-center"
                >
                    <Icon icon="ph:chat-bold" class="h-[1rem] w-[1rem]"/>
                    <span class="ml-2 font-semibold">{{ props.data.caption }}</span>
                </div>
                <div v-if="data.reactions.length > 0" class="flex flex-row items-center gap-1 mt-4">
                    <ReactionView v-for="r in data.reactions" :value="r" disabled/>
                </div>
            </div>
        </CardFooter>
    </Card>
</template>
