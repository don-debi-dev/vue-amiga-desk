<template>
  <div :class="['upload-wrapper']">
    <FileComponent :disabled="disableFiledrop">
      <DropComponent :text="fileName || 'Click/Drop image here'" @file-drop="onFileDrop" :disabled="disableFiledrop"/>
    </FileComponent>
    <ButtonComponent :disabled="disableUpload" :text="'Upload'" @click="onUpload"/>
  </div>
</template>

<script setup lang="ts">

import DropComponent from './DropComponent.vue';
import ButtonComponent from './ButtonComponent.vue';
import FileComponent from './FileComponent.vue';
import { ref, computed } from 'vue';

let file = ref<File | null>(null);

const disableUpload = computed(() => {
  return file.value == null;
});

const disableFiledrop = computed(() => {
  return file.value != null;
});

const fileName = computed(() => {
  return file.value?.name;
});

const onFileDrop = (dt: DataTransfer) => {
  file.value = dt.files[0];
}

const onUpload = (_e: Event) => {
  if (!file.value) return
  const formData = new FormData();
  formData.append("file", file.value);
  // stops here
}

</script>

<style scoped>

.upload-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  margin: 1rem;
  input {
    width: fill;
  }
}

</style>