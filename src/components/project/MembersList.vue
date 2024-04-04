<template>
    <div class="
        sprints-list
      bg-zinc-50
        border-solid
        border-1
      border-slate-400
        shadow-md
        overflow-y-scroll"
    >
        <MembersListItem v-for="member of members" :key="member.id" :member="member" />
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import MembersListItem from './MembersListItem.vue';

const props = defineProps({
    members: Array,
});
</script>
