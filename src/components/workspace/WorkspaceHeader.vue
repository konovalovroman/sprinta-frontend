<template>
    <header class="bg-stone-800 p-4 flex items-center fixed w-full h-20">
        <div class="header-logo hover:cursor-pointer mr-12 ml-8 hover:brightness-110">
            <router-link to="/workspace">
                <img width="40" src="@/assets/logo.svg"/>
            </router-link>
        </div>
        <div class="header-project-name">
            <h1 class="text-white text-xl font-bold">Workspace</h1>
        </div>
        <div class="header-links ml-auto">
            <ul class="text-sm lg:flex-grow">
                <li class="mt-4 font-light hover:cursor-pointer hover:text-violet-300 inline-block lg:mt-0 text-white mr-10"
                    @click="openCreateProjectModal">Create project</li>
            </ul>
        </div>
        <div class="header-avatar mr-6 hover:cursor-pointer">
            <img src="@/assets/empty-avatar.svg" width="40" alt="avatar">
        </div>
    </header>
</template>

<script setup>
import { defineEmits } from 'vue';

const emit = defineEmits(['openCreateProjectModal']);

const openCreateProjectModal = () => {
    emit('openCreateProjectModal');
};
</script>
