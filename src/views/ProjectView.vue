<template>
    <ProjectHeader :project="project"/>
    <div class="project-content flex gap-2 pt-24 p-5 min-h-screen max-h-screen">
        <SprintsList class="w-2/12" :sprints="sprints"/>
        <SelectedProjectBoard class="w-10/12"/>
    </div>
</template>

<script setup>
import { computed, defineProps, nextTick, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import ProjectHeader from '@/components/project/ProjectHeader.vue';
import SprintsList from '@/components/project/SprintsList.vue';
import SelectedProjectBoard from '@/components/project/SelectedProjectBoard.vue';

const store = useStore();
const router = useRouter();

const props = defineProps({
    id: Number,
});

const project = computed(() => store.state.projects.selectedProject);
const sprints = computed(() => store.state.sprints.sprints);



onMounted(async () => {
    await store.dispatch('getOneProject', props.id);
    await store.dispatch('getSprintsForProject', props.id);

    if (Object.keys(project.value).length === 0) {
        router.push('/notfound');
        // TODO: why router.push({ name: 'not-found' }) not work
    }
});

onUnmounted(() => {
    store.dispatch('clearSelectedProject');
    store.dispatch('clearSprints');
});
</script>
