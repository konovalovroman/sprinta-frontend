<template>
    <div class="projects-list">
      <div class="flex flex-wrap justify-start gap-2">
        <router-link v-for="project in projects" :key="project.id" :to="{ name: 'project', params: { id: project.id } }">
          <ProjectListItem :project="project" />
        </router-link>
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
