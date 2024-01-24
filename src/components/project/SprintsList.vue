<template>
    <div class="
        sprints-list
      bg-zinc-50
        border-solid
        border-1
      border-slate-400
        shadow-md
        overflow-y-scroll"
    >
        <div v-if="sprints.length === 0"
            class="
                no-sprints-label
                font-thin
                flex
                justify-center
                mt-2
              text-stone-600"
            >
                No sprints yet for project
        </div>
        <ul v-else>
            <SprintsListItem v-for="sprint of sprints" :key="sprint.id" :sprintName="sprint.name"/>
        </ul>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import SprintsListItem from './SprintsListItem.vue';

const props = defineProps({
    sprints: Array,
});
</script>
