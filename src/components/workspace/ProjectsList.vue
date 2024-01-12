<template>
    <div class="projects-list mt-20">
        <div class="flex flex-wrap justify-start gap-2">
            <ProjectListItem v-for="project in projects" :key="project.id" :project="project"/>
        </div>
    </div>
</template>
  

<script setup>
import { defineProps } from 'vue';
import ProjectListItem from './ProjectListItem.vue';

const props = defineProps({
    projects: Array,
});
</script>
