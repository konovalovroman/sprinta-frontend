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
        <p v-if="errors.signIn" class="text-red-500 font-extralight text-xs">{{ errors.signIn }}</p>
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
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { useForm, useField } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';

const store = useStore();
const router = useRouter();

const emit = defineEmits(['close']);

const validationSchema = toTypedSchema(
    zod.object({
        email: zod.string().email('Enter a vaild email'),
        password: zod.string(),
    }),
);

const { handleSubmit, errors, setErrors } = useForm({ validationSchema });

const { value: email } = useField('email');
const { value: password } = useField('password');

const onSubmit = handleSubmit(async (values) => {
    const payload = {
        email: values.email,
        password: values.password,
    };

    await store.dispatch('signIn', payload);
    const { isAuthenticated } = store.state.auth;

    if (!isAuthenticated) {
        return setErrors({ signIn: 'Invalid username or password' });
    }

    return router.push('/workspace');
});

const onClose = () => {
    emit('close');
};
</script>
