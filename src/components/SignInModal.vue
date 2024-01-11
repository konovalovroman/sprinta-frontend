<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-8 rounded-md w-96">
        <p class="text-center text-lg font-semibold mb-4">Sign in to Sprinta</p>
    <form @submit.prevent="onSubmit">
    <input
        type="email"
        id="email"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4"
        placeholder="Enter your email"
        required
        v-model="email"
    />

    <input
        type="password"
        id="password"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4"
        placeholder="Enter your password"
        required
        v-model="password"
    />
    <div class="h-5">
        <p v-if="errors.signIn" class="text-red-500 font-extralight text-xs">{{ errors.signIn.message }}</p>
    </div>

    <button
        class="bg-gray-800 text-white px-4 py-2 rounded-md mb-4"
        type="submit"
    >
        Sign In
    </button>

    <router-link to="/signup" class="text-sm">
        <p class="text-sm text-purple-900">
            New at Sprinta? Join now!
        </p>
    </router-link>


    <p class="
        text-sm
        mt-8
        text-center
        cursor-pointer
        hover:text-fuchsia-900"
        @click="onClose"
    >
        Close
    </p>

    </form>
    </div>
</div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const email = ref('');
const password = ref('');
const errors = ref({});

const store = useStore();
const router = useRouter();

const emit = defineEmits(['close']);

const onSubmit = async () => {
    const payload = {
        email: email.value,
        password: password.value,
    };

    await store.dispatch('signIn', payload);
    const { isAuthenticated } = store.state.auth;

    if (!isAuthenticated) {
        errors.value.signIn = {
            message: 'Invalid username or password',
        };
        return;
    }

    router.push('/workspace');
};

const onClose = () => {
    emit('close');
};
</script>
