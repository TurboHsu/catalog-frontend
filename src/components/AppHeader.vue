<script setup lang="ts">
import { Icon } from '@iconify/vue';
import DarkModeSwitch from './DarkModeSwitch.vue';
import { Button } from '@/components/ui/button';
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateHome = () => {
    router.push('/');
};

</script>

<template>
    <header class="sticky top-0 z-40 flex border-b bg-background/80 backdrop-blur-lg border-border">
        <div class="container flex items-center h-14 max-w-screen-2xl" @click="navigateHome">
            <Icon icon="solar:cat-outline" class="h-[2rem] w-[2rem] mx-2" />
            <h1 class="hidden mx-2 text-xl md:flex">NekoMeow</h1>
        </div>
        <div class="container flex items-center justify-between flex-1 space-x-2 md:justify-end">
            <Button variant="ghost">
                <RouterLink to="/">Home</RouterLink>
            </Button>
            <Button variant="ghost">
                <RouterLink to="/about">About</RouterLink>
            </Button>
            <DarkModeSwitch class="" />
        </div>
    </header>
</template>