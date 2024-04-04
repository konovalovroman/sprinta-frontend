<template>
     <header class="bg-stone-800 p-4 flex justify-between items-center">
      <div class="text-white">
        <h1 class="text-xl font-bold">Sprinta</h1>
      </div>
      <div>
        <button
            class="
            bg-white
            hover:bg-purple-100
            text-stone-800
            font-bold
            py-2 px-6
            rounded-md"
            @click="openModal"
        >
          Join
        </button>
      </div>
    </header>
    <SignInModal v-if="isModalOpen" @close="closeModal" />
</template>

<script setup>
import { ref } from 'vue';
import SignInModal from './SignInModal.vue';

const isModalOpen = ref(false);

const openModal = () => {
    isModalOpen.value = true;
};

const closeModal = () => {
    isModalOpen.value = false;
};
</script>
