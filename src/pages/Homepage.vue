<script setup lang="ts">
import CatView from "../components/CatView.vue";
import {onMounted, reactive, ref, watch} from "vue";
import Loading from "../components/Loading.vue";
import {toast} from "vue-sonner";
import {Cat} from "@/types/cat";
import {fetchCats} from "@/utils/api/api";
import {Icon} from "@iconify/vue";
import {Dialog} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import DialogTrigger from "@/components/ui/dialog/DialogTrigger.vue";
import DialogContent from "@/components/ui/dialog/DialogContent.vue";
import ChunkCatView from "@/components/ChunkCatView.vue";
import {useRouter} from "vue-router";
import {useElementVisibility} from "@vueuse/core";
import sleep from "@/utils/common/sleep";

const isLoaded = ref<boolean>(false);
const page = ref<number>(1);
const isLoadingMore = ref<boolean>(false);
const isLastPage = ref<boolean>(false);
const cats = reactive<Cat[]>([]);
const aspectRatios = reactive<number[]>([]);
const selectedCat = ref<Cat & { idx: number } | null>(null);
const router = useRouter();
const footerRef = ref<HTMLElement | null>(null);
const footerVisibility = useElementVisibility(footerRef);

const fetchData = async (page: number) => {
    try {
        const c = await fetchCats(page);
        if (c.length === 0) {
            isLastPage.value = true;
            return;
        }
        cats.push(...c);
        aspectRatios.push(-1)
    } catch (e) {
        toast.warning("Failed to fetch data");
        console.warn(e);
    } finally {
        if (!isLoaded.value) {
            isLoaded.value = true;
        }
    }
};

const handleReachFooter = async () => {
    if (isLastPage.value || !isLoaded.value) {
        return;
    }
    if (
        footerVisibility.value &&
        !isLoadingMore.value
    ) {
        isLoadingMore.value = true;
        page.value++;
        await fetchData(page.value);
        isLoadingMore.value = false;
    }
};

const footerVisibilityCheck = async () => {
    while (footerVisibility.value) {
        if (isLastPage.value) {
            break
        }
        await handleReachFooter();
        await sleep(100);
    }
};

const handleCatViewClick = async (cat: Cat) => {
    const trigger = document.getElementById("trigger");
    const idx = cats.findIndex(({uuid}) => cat.uuid === uuid)
    selectedCat.value = {...cat, idx};
    trigger?.click();
};

const handleOpen = () => {
    router.push(`/cat/${selectedCat.value?.uuid}`)
};

onMounted(async () => {
    await fetchData(page.value);
});

watch(footerVisibility, async (footerVisibility) => {
    if (footerVisibility) {
        await footerVisibilityCheck();
    }
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
                    <div v-for="(c, idx) in cats" :key="c.uuid">
                        <CatView :data="c" @click="handleCatViewClick(c)" @load="(r) => aspectRatios[idx] = r"
                                 class="cursor-pointer"/>
                    </div>
                </div>
                <div v-if="isLastPage">
                    <span class="text-lg font-semibold">No more cats to show</span>
                </div>
                <div v-else>
                    <Icon icon="tdesign:cat" class="h-[2rem] w-[2rem] animate-spin" ref="footerRef"/>
                </div>
            </div>
            <div v-else class="w-full h-full">
                <Loading class="w-full h-full"/>
            </div>
        </div>
        <DialogTrigger class="hidden" id="trigger"/>

        <DialogContent class="max-w-[30rem]">
            <ChunkCatView v-if="selectedCat" :data="selectedCat" :cat-ratio="aspectRatios[selectedCat.idx]"/>
            <div class="flex justify-end w-full">
                <Button class="flex flex-row items-center gap-1" @click="handleOpen">
                    <Icon icon="lets-icons:external" class="w-5 h-5"/>
                    Open
                </Button>
            </div>
        </DialogContent>
    </Dialog>
</template>
