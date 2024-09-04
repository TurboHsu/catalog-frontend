<script setup lang="ts">
import CatView from "../components/CatView.vue";
import { onBeforeUnmount, onMounted, ref } from "vue";
import Loading from "../components/Loading.vue";
import { toast } from "vue-sonner";
import { Cat } from "@/types/cat";
import { fetchCats } from "@/utils/api/api";
import { Icon } from "@iconify/vue";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import DialogTrigger from "@/components/ui/dialog/DialogTrigger.vue";
import DialogContent from "@/components/ui/dialog/DialogContent.vue";
import ChunkCatView from "@/components/ChunkCatView.vue";
import { useRouter } from "vue-router";

const isLoaded = ref<boolean>(false);
const page = ref<number>(1);
const isLoadingMore = ref<boolean>(false);
const isLastPage = ref<boolean>(false);
const cats = ref<Cat[]>([]);
const selectedCat = ref<Cat | null>(null);
const router = useRouter();

const fetchData = async (page: number) => {
	try {
		const c = await fetchCats(page);
		if (c.length === 0) {
			isLastPage.value = true;
			return;
		}
		cats.value.push(...c);
		if (!isLoaded.value) {
			isLoaded.value = true;
		}
	} catch (e) {
		toast.warning("Failed to fetch data");
		console.warn(e);
	}
};

const handleScroll = async () => {
	if (isLastPage.value || !isLoaded.value) {
		return;
	}
	if (
		window.innerHeight + window.scrollY >= document.body.offsetHeight - 50 &&
		!isLoadingMore.value
	) {
		console.log("loading more");
		isLoadingMore.value = true;
		page.value++;
		await fetchData(page.value);
		isLoadingMore.value = false;
	}
};

const scrollUpdateCheck = async () => {
    while (document.body.offsetHeight <= window.innerHeight) {
		if (isLastPage.value) {
			break
		}
        await handleScroll();
    }
};

const handleCatViewClick = async (cat: Cat) => {
    const trigger = document.getElementById("trigger");
    selectedCat.value = cat;
    trigger?.click();
};

const handleOpen = () => {
    router.push(`/cat/${selectedCat.value?.uuid}`)
};

onMounted(async () => {
	await fetchData(page.value);
	window.addEventListener("scroll", handleScroll);
	scrollUpdateCheck();
});

onBeforeUnmount(() => {
	window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
	<Dialog>
		<div class="flex justify-center items-center h-full w-full min-h-[80vh] overflow-x-hidden">
			<div
				v-if="isLoaded"
				class="flex flex-col items-center justify-center gap-10 my-10"
			>
				<div
					v-if="cats.length"
					class="flex flex-row flex-wrap items-center justify-center gap-5 mx-10"
				>
					<div v-for="c in cats" :key="c.uuid">
						<CatView :data="c" @click="handleCatViewClick(c)" class="cursor-pointer" />
					</div>
				</div>
				<div v-if="isLastPage">
					<span class="text-lg font-semibold">No more cats to show</span>
				</div>
				<div v-else>
					<Icon icon="tdesign:cat" class="h-[2rem] w-[2rem] animate-spin" />
				</div>
			</div>
			<div v-else class="w-full h-full">
				<Loading class="w-full h-full" />
			</div>
		</div>
        <DialogTrigger class="hidden" id="trigger" />

		<DialogContent class="w-[80vw]">
			<ChunkCatView v-if="selectedCat" :data="selectedCat" />
            <div class="flex justify-end w-full">
                <Button class="flex flex-row items-center gap-1" @click="handleOpen">
                    <Icon icon="lets-icons:external" class="w-5 h-5" />
                    Open
                </Button>
            </div>
		</DialogContent>
	</Dialog>
</template>
