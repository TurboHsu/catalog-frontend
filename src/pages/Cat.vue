<script setup lang="ts">
import ChunkCatView from "@/components/ChunkCatView.vue";
import Card from "@/components/ui/card/Card.vue";
import CardContent from "@/components/ui/card/CardContent.vue";
import CardHeader from "@/components/ui/card/CardHeader.vue";
import { Cat } from "@/types/cat";
import { fetchCat } from "@/utils/api/api";
import { Icon } from "@iconify/vue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { toast } from "vue-sonner";
import { Button } from "@/components/ui/button";

const route = useRoute();
const cat = ref<Cat>();
const noSuchCat = ref<boolean>(false);

const goBack = () => {
	window.history.back();
};

onMounted(async () => {
	const catId = route.params.uuid as string;
	try {
		cat.value = await fetchCat(catId);
	} catch (e: any) {
		console.error(e);
		if (e?.response?.status === 404) {
			toast.error("No such cat");
			noSuchCat.value = true;
		}
	}
});
</script>

<template>
	<Card class="mx-10 my-10">
		<CardHeader class="flex flex-row flex-wrap items-center gap-5">
			<Icon icon="fa6-solid:cat" class="w-8 h-8" />
			<span class="break-all">Cat ID: {{ route.params.uuid }}</span>
		</CardHeader>
		<CardContent>
			<ChunkCatView v-if="cat" :data="cat" />
			<div v-if="noSuchCat" class="w-full h-[60vh] flex flex-col items-center justify-center">
				<div class="flex flex-col justify-center w-full my-2">
                    <div class="flex justify-center w-full">
                        <Icon icon="line-md:alert-circle-twotone" class="w-16 h-16 text-orange-400" />
                    </div>
					<p class="text-2xl font-semibold text-center dark:text-gray-100">
						No such cat...
					</p>
					<p class="text-lg text-center text-gray-500 dark:text-grey-400">
						Poor kitty... Let's praise the cat gods for its safe return home.
					</p>
				</div>
				<div class="flex items-center justify-center w-full my-2">
					<Button class="items-center" @click="goBack">
						<Icon icon="ion:chevron-back" class="mr-2 size-4" />
						<div>Go back</div>
					</Button>
				</div>
			</div>
		</CardContent>
	</Card>
</template>
