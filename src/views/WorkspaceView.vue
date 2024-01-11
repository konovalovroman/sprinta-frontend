<template>
    <h1 class="text-4xl font-bold">Workspace</h1>
    <h3 class="font-bold">User:</h3>
    <p>{{ store.state.auth.user.username }}</p>
    <p>{{ store.state.auth.user.email }}</p>
    <button class="bg-rose-800 text-white px-4" @click="logout">Logout</button>
</template>

<script setup>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const logout = async () => {
    await store.dispatch('logout');
    router.push('/');
};
</script>
