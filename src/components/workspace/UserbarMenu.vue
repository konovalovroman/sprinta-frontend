<template>
    <div class="userbar-menu fixed top-0 right-0 p-4">
        <div class="bg-fuchsia-700 h-12 px-5 rounded-full flex items-center justify-center hover:cursor-pointer">
            <div class="text-white text-xl">{{ user.username }}</div>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    user: Object,
});
</script>
