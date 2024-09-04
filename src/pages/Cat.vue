<script setup lang="ts">
import ChunkCatView from '@/components/ChunkCatView.vue';
import Card from '@/components/ui/card/Card.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import CardHeader from '@/components/ui/card/CardHeader.vue';
import { Cat } from '@/types/cat';
import { fetchCat } from '@/utils/api/api';
import { Icon } from '@iconify/vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute();
const cat = ref<Cat>();

onMounted(async () => {
    const catId = route.params.uuid as string;
    cat.value = await fetchCat(catId);
});

</script>

<template>
    <Card class="mx-10 my-10">
        <CardHeader class="flex flex-row items-center gap-5">
            <Icon icon="fa6-solid:cat" class="w-8 h-8" />
            <span>Cat ID: {{ route.params.uuid }}</span>
        </CardHeader>
        <CardContent>
            <ChunkCatView v-if="cat" :data="cat" />
        </CardContent>
    </Card>
</template>