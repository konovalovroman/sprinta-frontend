<template>
  <div class="home">
    <HomeHeader />
    <div class="homepage__body flex flex-col items-center justify-center">
      <div class="logo mt-12">
        <img width="100" src="../assets/logo.svg" alt="sprinta" />
      </div>
      <h1 class="
          text-4xl
          mt-12
          font-medium"
      >
          Welcome to Sprinta
      </h1>
    </div>
  </div>
</template>

<script setup>
import HomeHeader from '@/components/home/HomeHeader.vue';
import { useStore } from 'vuex';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

onMounted(() => {
    const { isAuthenticated } = store.state.auth;

    if (isAuthenticated) {
        router.push('/workspace');
    }
});
</script>
