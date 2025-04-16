<template>
  <div class="icon-wrapper" 
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
    :style="iconStyle"
  >
    <img 
      :draggable="false"
      src="../assets/images/pixelated/ha-logo-rb.png"
      ref="handle"
    />
    <span :class="['title', active ? 'active' : '']">
      {{ title }}
    </span>
  </div>
</template>
  
<script setup lang="ts">
import { useDraggable } from '@/composables';
import { useIconStore } from '@/store';
import { Icon } from '@/types';
import { upCount } from '@/utils/Utils';
import { computed, CSSProperties, defineProps, ref, onMounted, onUnmounted } from 'vue';

  const props = defineProps<Icon & {
    index: number;
    inWindow?: boolean;
  }>();

  const title = computed(() => props.title ?? 'Nu icon');

  const id = ref(props.id); //TODO: Change
  const zi = ref(props.zi); //TODO: Change
  
  const index = ref(props.index);

  const inWindow = computed(() => props.inWindow ?? false);

  const handle = ref<HTMLElement | null>(null);

  const store = useIconStore();

  const indexOffset = {
    x: index.value * 250,
    y: 0
  };

  const { position } = useDraggable(handle, {
    position: { 
      x: inWindow.value ? 0 : indexOffset.x, 
      y: inWindow.value ? 0 : 50
    },
    id: id.value
  });

  const onMouseDown = () => {
    focus();
    updateZi(true);
  };

  const onMouseUp = () => {
    updateZi(false);
  };

  const focus = () => {
    store.focus({ payload: { ...props } });
  };

  const updateZi = (mouseDown = false) => {
    zi.value = upCount(mouseDown ? 1 : 10); //TODO: Change
    store.update({ payload: { ...props, zi: zi.value } }); //TODO: Change
  };

  const onKeyPress = ({ key }: KeyboardEvent) => {
    if (key == 'Delete' && active.value) removeIcon();
  } 

  const removeIcon = () => {
    console.log(props);
    store.remove({ payload: { ...props } });
  };

  const active = computed(() => {
    return store.focused === id.value;
  });

  const iconStyle = computed<CSSProperties>(() => {
    return {
      position: inWindow.value? 'relative' : 'absolute',
      left: `${position.value.x}px`,
      top: `${position.value.y}px`,
      zIndex: zi.value,
    } as CSSProperties;
  });

  onMounted(() => {
    window.addEventListener('keydown', onKeyPress);
  }); 

  onUnmounted(() => {
    window.removeEventListener('keydown', onKeyPress);
  }); 

</script>

<style lang="scss" scoped>
  @use '@/colors.scss' as *;

  .icon-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1rem;
    img {
      width: 200px;
    }
    .title {
      padding: .5rem;
      background-color: var(--color-white);
    }
    img.active {
      filter: invert(1);
    }
    .title.active {
      background-color: var(--color-purple);
    }
  }
</style>
