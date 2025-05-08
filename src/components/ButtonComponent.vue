<template>
    <input type="button" 
      :value="props.text" 
      :disabled="props.disabled" 
      :class="[props.className]"
      @click="action">
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
  background-color: var(--color-white);
  padding: 0.5rem;

  @include border-solid;
}

input[type="button"]:active {
  background-color: var(--color-pink);
}

</style>