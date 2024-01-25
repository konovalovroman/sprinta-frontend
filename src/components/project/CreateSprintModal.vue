<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-8 rounded-md w-96">
        <p class="text-center text-lg font-semibold mb-4">Create new sprint</p>
    <form @submit.prevent="onSubmit">
    <div class="h-5">
        <p class="text-red-500 font-extralight text-xs">{{ errors.name }}</p>
    </div>
    <p>Sprint name</p>
    <input
        type="text"
        id="name"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4"
        placeholder="Enter sprint name"
        required
        v-model="name"
    />

    <div class="h-5">
        <p class="text-red-500 font-extralight text-xs">{{ errors.endsAt }}</p>
    </div>
    <p>When it must end?</p>
    <input
        type="date"
        id="endsAt"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4"
        placeholder="When does it have to end?"
        required
        v-model="endsAt"
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
        name: zod
            .string()
            .min(1, 'Required')
            .max(40, 'Name must be less than 40 characters')
            .refine((name) => name.trim() !== '', {
                message: 'Input a valid name',
            }),
        endsAt: zod
            .string()
            .transform((dateDtr) => new Date(dateDtr).toISOString())
            .refine((endsAt) => new Date(endsAt) > new Date(), { 
                message: 'Input a valid date',
            }),
    }),
);

const { handleSubmit, errors } = useForm({ validationSchema });

const { value: name } = useField('name');
const { value: endsAt } = useField('endsAt');

const onSubmit = handleSubmit(async (values) => {
    const { selectedProject } = store.state.projects;

    const createSprintPayload = {
        projectId: selectedProject.id,
        ...values,
    };

    await store.dispatch('createSprint', createSprintPayload);

    onClose();
});

const onClose = () => {
    emit('close');
};
</script>
