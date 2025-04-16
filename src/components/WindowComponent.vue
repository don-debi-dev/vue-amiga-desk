<template>
  <div
    :class="['window-frame', max ? 'full-size-frame' : '']"
    @mousedown="onMouseDown"
    :style="windowStyle"
  >
    <div class="window-top" :style="{ zIndex: zi }">
      
      <span @click="removeWindow">
        <span>■</span>
      </span>

      <span
        class="title"
        ref="handle"
      >
        {{ active ? `* ${title} *` : title }}
      </span>

      <span @click="toggleFullWindow">{{ max ? '-' : '+' }}</span>
    </div>

    <div :class="['window-middle']">
      <div :class="['window-content', output.isHovered ? 'shadow' : '']" ref="target">
        <!-- <component v-for="(comp, index) in props.content" :is="comp" :key="index" /> -->
        <component v-for="({component, cprops}, iidx) in props.content"
          :is="component"
          :title="`${cprops.title}-${index}`"
          :id="cprops.id"
          :zi="zi"
          :index="iidx"
          :key="`in-window-${id}-${cprops.id}`"
          :inWindow="true"
        />
        <!-- <component
        v-for="(entry, i) in props.content"
        :is="entry.component"
        v-bind="entry.props"
        :key="entry.props.id"
        /> -->
      </div>
      <div :class="['window-right', max ? 'hide' : '']" :style="{ zIndex: zi }"></div>
    </div>

    <div :class="['window-bottom', max ? 'hide' : '']" :style="{ zIndex: zi }">
      <div class="window-corner" />
    </div>

  </div>
</template>

<script setup lang="ts">

import { computed, CSSProperties, defineProps, ref, watch } from 'vue';
import { upCount } from '@/utils/Utils';
import { useWindowStore } from '@/store';
import { UIComponents, Window } from '@/types';
import { useDraggable, useDropTarget } from '@/composables';
import { eventBus } from '@/bus/eventBus';

import IconComponent from './IconComponent.vue';

const { dropped, output, target } = useDropTarget();

const props = defineProps<Window & {
  index: number
}>();

console.log(props);

const title = computed(() => props.title ?? '');

const id = ref(props.id); //TODO: Change

const index = ref(props.index);

const handle = ref<HTMLElement | null>(null);

const indexOffset = {
  x: index.value * 30,
  y: index.value * 30
};

const zi = ref(props.zi); //TODO: Change

const max = ref(false); //TODO: Change

const store = useWindowStore();

const { position } = useDraggable(handle, {
    position: { 
      x: 100 + indexOffset.x, 
      y: 100 + indexOffset.y 
    },
    id: id.value
  });

const onMouseDown = () => {
  focus();
  updateZi();
};

const focus = () => {
  store.focus({ payload: { ...props } });
};

const updateZi = () => {
  zi.value = upCount(); //TODO: Change
  store.update({ payload: { ...props, zi: zi.value } }); //TODO: Change
};

const removeWindow = () => {
  store.remove({ payload: { ...props } }); // Move to Event Interpreter ??
};

const active = computed(() => {
  return store.focused === id.value;
});

watch(active, (nu) => {
  if (nu) updateZi();
});

// Inject earlier as with optionclicked?
watch(dropped, (nu) => {
  if (nu?.id) eventBus.emit('iconDropped', { droppedId: nu.id, recievedId: id.value })
});

const toggleFullWindow = () => {
  max.value = !max.value;
};

// TODO: Automate or redo CSSS
const offsetAdjustment = {
  x: 30,
  y: 2
}

const windowStyle = computed<CSSProperties>(() => {
  return {
    position: max.value ? 'relative' : 'absolute',
    left: max.value ? '0px' : `${(position.value.x - offsetAdjustment.x)}px`,
    top: max.value ? '0px' : `${(position.value.y - offsetAdjustment.y)}px`,
    zIndex: zi.value,
  } as CSSProperties;
});

</script>

<style lang="scss" scoped>
@use '@/colors.scss' as *;

.full-size-frame {
  width: 100vw;
  height: 100vh;
}

.hide {
  display: none;
}

.shadow {
  background-color: var(--color-white);
}
</style>
