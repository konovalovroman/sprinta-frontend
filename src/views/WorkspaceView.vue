<template>
    <WorkspaceHeader @openCreateProjectModal="openModal"/>
    <div class="workspace-content flex gap-2 pt-24 p-5 min-h-screen max-h-screen overflow-y-scroll">
        <NoProjectsLabel v-if="userProjects.length === 0"/>
        <ProjectsList v-else :projects="userProjects" />
        <CreateProjectModal v-if="isModalOpen" @close="closeModal" />
    </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { onMounted, computed, ref } from 'vue';
import WorkspaceHeader from '@/components/workspace/WorkspaceHeader.vue';
import ProjectsList from '@/components/workspace/ProjectsList.vue';
import NoProjectsLabel from '@/components/workspace/NoProjectsLabel.vue';
import CreateProjectModal from '@/components/workspace/CreateProjectModal.vue';

const store = useStore();
const router = useRouter();

const userProjects = computed(() => store.state.projects.userProjects);
const currentUser = computed(() => store.state.auth.user);

const isModalOpen = ref(false);

const openModal = () => {
    isModalOpen.value = true;
};

const closeModal = () => {
    isModalOpen.value = false;
};

onMounted(async () => {
    await store.dispatch('getAllUserProjects');
});
</script>
