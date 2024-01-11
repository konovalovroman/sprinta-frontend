<template>
    <div class="flex items-center justify-center h-screen">
      <div class="
        bg-white p-8 
        rounded
        w-96
        border-solid
        border-1
        border-slate-400
        shadow-xl"
      >   
        <img src="@/assets/logo.svg" width="50" class="mx-auto pb-2" alt="logo" />
        <p class="text-center text-lg font-semibold mb-4">Join to Sprinta</p>
  
        <form @submit.prevent="onSubmit">
        <div class="h-5">
            <p class="text-red-500 font-extralight text-xs">{{ errors.username }}</p>
        </div>
          <input
            type="text"
            id="username"
            class="
              bg-gray-50 border 
              border-gray-300 
              text-gray-900 text-sm 
              rounded-lg 
              focus:ring-blue-500 
              focus:border-blue-500 
              block w-full p-2.5 mb-4"
            placeholder="Choose a username"
            v-model="username"
          />
  
        <div class="h-5">
            <p class="text-red-500 font-extralight text-xs">{{ errors.email }}</p>
        </div>
        <input
        type="email"
        id="email"
        class="
            bg-gray-50 border 
            border-gray-300 
            text-gray-900 text-sm 
            rounded-lg 
            focus:ring-blue-500 
            focus:border-blue-500 
            block w-full p-2.5 mb-4"
        placeholder="Enter your email"
        v-model="email"
        />
  
        <div class="h-5">
            <p class="text-red-500 font-extralight text-xs">{{ errors.password }}</p>
        </div>
        <input
        type="password"
        id="password"
        class="
            bg-gray-50 border 
            border-gray-300 
            text-gray-900 text-sm 
            rounded-lg 
            focus:ring-blue-500 
            focus:border-blue-500 
            block w-full p-2.5 mb-4"
        placeholder="Choose a password"
        v-model="password"
        />
  
        <div class="h-5">
            <p class="text-red-500 font-extralight text-xs">{{ errors.confirmPassword }}</p>
        </div>
        <input
        type="password"
        id="confirmPassword"
        class="
            bg-gray-50 border 
            border-gray-300 
            text-gray-900 text-sm 
            rounded-lg 
            focus:ring-blue-500 
            focus:border-blue-500 
            block w-full p-2.5 mb-4"
        placeholder="Confirm password"
        v-model="confirmPassword"
        />
  
        <div class="h-5">
            <p class="text-red-500 font-extralight text-xs">{{ errors.signUp }}</p>
        </div>
          <div class="flex items-center justify-between">
            <button
              class="bg-gray-800 text-white px-4 py-2 rounded-md mb-4"
              type="submit"
            >
              Sign Up
            </button>
            <router-link to="/" class="text-gray-500 hover:text-gray-700">
              Back
            </router-link>
          </div>
        </form>
      </div>
    </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useForm, useField } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';

const store = useStore();
const router = useRouter();

const signupSchema = toTypedSchema(
    zod.object({
        username: zod.string()
            .min(3, 'Username has to be at least 3 characters')
            .max(30, 'Username need to be shorter than 30 characters'),
        email: zod.string().email('Enter a vaild email'),
        password: zod.string()
            .refine((value) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value), {
                message: 'Password must be at least 8 characters long',
            }),
        confirmPassword: zod.string(),
    }),
);

const { handleSubmit, errors, setErrors } = useForm({ validationSchema: signupSchema });

const { value: username } = useField('username');
const { value: email } = useField('email');
const { value: password } = useField('password');
const { value: confirmPassword } = useField('confirmPassword');

const onSubmit = handleSubmit(async (values) => {
    const { username, email, password, confirmPassword } = values;

    if (password !== confirmPassword) {
        setErrors({ confirmPassword: 'Password not matching' });
        return;
    }

    const payload = { username, email, password };

    await store.dispatch('signUp', payload);
    const { isAuthenticated } = store.state.auth;

    if (!isAuthenticated) {
        setErrors({ signUp: 'Sign up error. Perhaps, email or username are taken' });
        return;
    }

    router.push('/workspace');
});
</script>
