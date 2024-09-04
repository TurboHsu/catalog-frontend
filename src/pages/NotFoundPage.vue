<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { Button } from '@/components/ui/button';

function goBack() {
    window.history.back();
}
</script>

<template>
    <div class="flex w-full h-[80vh] items-center justify-center flex-col">
        <div class="w-full flex justify-center my-2">
            <Icon icon="noto-v1:thinking-face" class="w-[10rem] h-[10rem]" />
        </div>
        <div class="w-full flex justify-center my-2 flex-col">
            <p class="text-center text-gray-100 text-2xl font-semibold">Nothing here...</p>
            <p class="text-center text-gray-400 text-lg">Looks like this kitty wandered too far from home!</p>
        </div>
        <div class="w-full flex justify-center my-2 items-center">
            <Button class="items-center" @click="goBack" >
                <Icon icon="ion:chevron-back" class="mr-2 size-4" />
                <div>Go back</div>
            </Button>
        </div>
    </div>
</template>