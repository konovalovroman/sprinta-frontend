<template>
    <ProjectHeader :project="project"
        @openCreateSprintModal="openCreateSprintModal"
        @openUpdateProjectModal="openUpdateProjectModal"
        />
    <div class="project-content flex gap-2 pt-24 p-5 min-h-screen max-h-screen">
        <div class="flex w-2/12 flex-col space-y-2">
            <SprintsList class="flex-1" :sprints="sprints"/>
            <MembersList class="flex-1" :members="project.members"/>
        </div>
        <SelectedProjectBoard class="w-10/12"/>
    </div>
    <CreateSprintModal v-if="isCreateSprintModalOpen" @close="closeCreateSprintModal" />
    <UpdateProjectModal v-if="isUpdateProjectModalOpen" @close="closeUpdateProjectModal" :project="project"/>
</template>

<script setup>
import { computed, defineProps, ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import ProjectHeader from '@/components/project/ProjectHeader.vue';
import SprintsList from '@/components/project/SprintsList.vue';
import SelectedProjectBoard from '@/components/project/SelectedProjectBoard.vue';
import MembersList from '@/components/project/MembersList.vue';
import CreateSprintModal from '@/components/project/CreateSprintModal.vue';
import UpdateProjectModal from '@/components/project/UpdateProjectModal.vue';

const store = useStore();
const router = useRouter();

const props = defineProps({
    id: Number,
});

const project = computed(() => store.state.projects.selectedProject);
const sprints = computed(() => store.state.sprints.sprints);

const isCreateSprintModalOpen = ref(false);
const isUpdateProjectModalOpen = ref(false);

const openCreateSprintModal = () => {
    isCreateSprintModalOpen.value = true;
};
const closeCreateSprintModal = () => {
    isCreateSprintModalOpen.value = false;
};

const openUpdateProjectModal = () => {
    isUpdateProjectModalOpen.value = true;
};
const closeUpdateProjectModal = () => {
    isUpdateProjectModalOpen.value = false;
};


onMounted(async () => {
    await store.dispatch('getOneProject', props.id);
    await store.dispatch('getSprintsForProject', props.id);

    if (Object.keys(project.value).length === 0) {
        router.push('/workspace');
        // TODO: NotFoundView must be shown
    }
});

onUnmounted(() => {
    store.dispatch('clearSelectedProject');
    store.dispatch('clearSprints');
});
</script>
