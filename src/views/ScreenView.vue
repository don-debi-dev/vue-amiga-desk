<template>
  <div class="screen">
    <MenuComponent type="screen" version="3.0" :menus="screenMenus" />
    <DesktopComponent />
  </div>
</template>

<script setup lang='ts'>

import MenuComponent from '@/components/MenuComponent.vue'
import DesktopComponent from '@/components/DesktopComponent.vue'

import { DropEvent, eventBus } from "@/bus/eventBus";
import { onOptionClick, useIconStore, useWindowStore } from "@/store";
import { Desk } from '@/data'
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { UIComponents } from '@/types';

const fileMenu = ref(Desk);
const fileMenuOptionsPlus = computed(() => fileMenu.value.options.map(opt => ({ ...opt, action: () => eventBus.emit("optionClicked", opt) })));
const { options, ...rest } = fileMenu.value;
const screenMenus = computed(() => [{ options: fileMenuOptionsPlus.value, ...rest }]);


const windowStore = useWindowStore()
const iconStore = useIconStore()

const onIconDropped = (e: DropEvent) => {
  const icon = iconStore.getCopy({payload:e});
  windowStore.addContent({payload:{ id: e.recievedId, component: { component: UIComponents.iconComponent, cprops: icon } }});
  iconStore.remove({ payload: { id:e.droppedId }})
}

onMounted(() => {
  eventBus.on('optionClicked', onOptionClick);
  eventBus.on('iconDropped', onIconDropped);
});

onUnmounted(() => {
  eventBus.off('optionClicked', onOptionClick);
  eventBus.off('iconDropped', onIconDropped);
});

</script>
