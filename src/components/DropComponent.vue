<template>
  <div :class="['drop-wrapper', `${error ? 'error' : '' }`, `${active && !error ? 'invert' : '' }`]" 
    @drop.prevent="onDrop"
    @dragenter="onDragEnterOver"
    @dragover="onDragEnterOver"
    @dragleave="onDragLeave"
  >
    <span :class="['drop-text']">{{ error ? 'File format error' : props.text }}</span>
    <slot></slot>
  </div>
</template>
  
<script setup lang="ts">
  import { computed, defineEmits, defineProps, onMounted, onUnmounted, ref } from 'vue'

  const props = defineProps<{
      text: string,
      format?: string,
      disabled?: boolean
  }>();

  const emit = defineEmits(['file-drop'])

  let active = ref(false)
  let error = ref(false)

  const format = computed(() => props.format ?? 'image');

  function setActiveState(toggle: boolean) {
      active.value = toggle
  }

  function setErrorState(toggle: boolean, timeout = 0) {
      error.value = toggle;

      if (toggle && timeout) {
        setTimeout(() => {
          error.value = false;
        }, 1000);
      }
  }

  const isAcceptedFileFormat = (dt: DataTransfer | null) => {
    if (dt && dt.files.length > 0) {
      const file = dt.files[0];
      if (file.type.startsWith(`${format.value}/`)) {
        setErrorState(false);
      }
      else {
        setErrorState(true);
      }
    }
  }

  const onDrop = ({ dataTransfer }: DragEvent) => {
    if (props.disabled) return

    setActiveState(false);
    isAcceptedFileFormat(dataTransfer);
    if (!error.value) emit('file-drop', dataTransfer);
  }
  
  const onDragEnterOver = (_e: DragEvent) => {
    // This event cannot read dataTransfer

    if (props.disabled) {
      setErrorState(true, 1000);
    } else {
      setActiveState(true);
    }
  }
  
  const onDragLeave = (_e: DragEvent) => {
    // This event cannot read dataTransfer
    setActiveState(false);
    setErrorState(false);
  }

  const preventDefault = (e: Event) => {
    // This event cannot read dataTransfer
    e.preventDefault()
  }
  
  // Events to cancel out default behaviour
  const events = ['dragenter', 'dragover', 'dragleave', 'drop']

  onMounted(() => {
      events.forEach((eventName) => {
          document.body.addEventListener(eventName, preventDefault)
      })
  })

  onUnmounted(() => {
      events.forEach((eventName) => {
          document.body.removeEventListener(eventName, preventDefault)
      })
  })

</script>

<style lang="scss" scoped>

@use '@/colors.scss' as *;

.drop-wrapper {
  width: 200px;
  height: 200px;
  border: dashed 4px var(--color-almost-black);
  
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  
  .drop-text {
    text-align: center;
    margin: 0;
  }
}
</style>
