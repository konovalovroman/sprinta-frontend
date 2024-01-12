<template>
    <div class="
        project-list-item
        bg-gray-100 shadow-md
        rounded-sm
        m-2
        p-4
        border-b-8
        border-gray-300
        hover:cursor-pointer
        hover:border-fuchsia-800" 
        style="width: 350px; height: 150px;">
        <h2 class="text-lg font-semibold">{{ project.name }}</h2>
        <p>Created by {{ project.owner.username }}</p>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    project: Object,
});
</script>
