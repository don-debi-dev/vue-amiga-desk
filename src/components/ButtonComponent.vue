<template>
    <input type="button" :value="props.text" @click="action" :disabled="props.disabled" :class="[props.className]">
</template>
  
<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';

const emit = defineEmits(['click'])

const props = defineProps<{
	text: string;
	disabled?: boolean;
	className?: string;
}>();

const action = (e: Event) => {
	emit('click', e);
}

</script>

<style lang="scss" scoped>
@use '@/colors.scss' as *;
@use '@/App.scss' as *;

input[type="button"] {
  font-family: 'amiga4ever', sans-serif;
  background-color: var(--color-pink);
  padding: 0.25rem 1rem;
}

:active {
  filter: invert(1);
}
</style>