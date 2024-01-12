<template>
    <NoProjectsLabel v-if="userProjects.length === 0"/>
    <ProjectsList v-else :projects="userProjects" />
    <UserbarMenu :user="currentUser" />
    <AddProjectButton @click="openModal" />
    <CreateProjectModal v-if="isModalOpen" @close="closeModal" />
</template>

<script setup>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { onMounted, computed, ref } from 'vue';
import ProjectsList from '@/components/workspace/ProjectsList.vue';
import NoProjectsLabel from '@/components/workspace/NoProjectsLabel.vue';
import UserbarMenu from '@/components/workspace/UserbarMenu.vue';
import AddProjectButton from '@/components/workspace/AddProjectButton.vue';
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
