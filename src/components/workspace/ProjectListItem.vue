<template>
    <div class="
        project-list-item
        bg-zinc-100
        shadow-md
        rounded-sm
        m-2
        p-4
        border-b-4
        border-zinc-100
        hover:cursor-pointer
        hover:border-fuchsia-700"
        style="width: 280px; height: 150px;">
       
        <h2 class="text-md font-semibold text-stone-800">{{ project.name }}</h2>
        <p class="font-light text-xs text-stone-700">Created by {{ project.owner.username }}</p>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    project: Object,
});
</script>
