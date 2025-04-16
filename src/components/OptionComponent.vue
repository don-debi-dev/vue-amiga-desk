<template>
  <div :class="['menu-option', props.invert && 'invert']" @click="actionGo">
    {{ props.text }}
  </div>
</template>

<script setup lang="ts">
import { Option } from '@/types';
import { defineProps } from 'vue';

const props = defineProps<{
  text: string;
	option?: Option;
	invert?: boolean;
}>();

const actionGo = () => {
  if (props.option?.action) {
    props.option.action();
  }
};

</script>

<style scoped>
.invert {
  filter: invert(1);
}
</style>