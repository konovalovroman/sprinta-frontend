<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-8 rounded-md w-96">
        <p class="text-center text-lg font-semibold mb-4">Create new project</p>
    <form @submit.prevent="onSubmit">
    <div class="h-5">
        <p class="text-red-500 font-extralight text-xs">{{ errors.name }}</p>
    </div>
    <input
        type="text"
        id="name"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4"
        placeholder="Enter project name"
        required
        v-model="name"
    />

    <button
        class="bg-gray-800 text-white px-4 py-2 rounded-md mb-4"
        type="submit"
    >
        Create
    </button>

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
import { defineEmits } from 'vue';
import { useStore } from 'vuex';
import { useForm, useField } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';

const store = useStore();

const emit = defineEmits(['close']);

const validationSchema = toTypedSchema(
    zod.object({
        name: zod.string().min(1, 'Required').max(40, 'Name must be less than 40 characters'),
    }),
);

const { handleSubmit, errors } = useForm({ validationSchema });

const { value: name } = useField('name');

const onSubmit = handleSubmit(async (values) => {
    const { name } = values;
    await store.dispatch('createProject', { name });
    onClose();
});

const onClose = () => {
    emit('close');
};
</script>
