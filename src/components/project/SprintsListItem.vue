<template>
    <li class="
        sprints-list-item
        text-xs
        h-12
        flex
        items-center
        border-solid
        border-b
        font-normal
        pl-2
        truncate
        border-stone-200
        text-stone-700
        bg-neutral-50	
        hover:cursor-pointer
        hover:bg-neutral-100"
    >
        {{ sprintName }}
    </li>
</template>

<script setup>
import { defineProps, onMounted } from 'vue';

const props = defineProps({
    sprintName: String,
});
</script>
