<template>
    <input id="file-upload" type="file" name="" accept="image/png, image/jpeg" :disabled="props.disabled"/>
    <label for="file-upload" class="file-upload">
        <slot></slot>
    </label>
</template>
  
<script setup lang="ts">

import { defineProps } from 'vue';

const props = defineProps<{
    disabled?: boolean;
}>();

</script>

<style lang="scss" scoped>
    input[type="file"] {
        display: none;
    }
    .file-upload {
        display: flex;
        justify-content: center;
    }
</style>