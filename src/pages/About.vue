<script setup lang="ts">
import Card from '@/components/ui/card/Card.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import CardHeader from '@/components/ui/card/CardHeader.vue';
import { Icon } from '@iconify/vue';

</script>

<template>
    <Card class="w-full min-h-[80vh] md:mx-10 my-10 overflow-x-hidden">
        <CardHeader class="flex flex-row items-center gap-5">
            <Icon icon="ph:info-bold" class="w-8 h-8" />
            <span>About</span>
        </CardHeader>
        <CardContent class="flex flex-col gap-3">
            <span>
                This is a site about cats I met everyday.
            </span>
            <span>
                My blog: <a href="https://owow.cc">https://owow.cc</a>
            </span>
        </CardContent>
    </Card>
</template>