<template>
  <div class="desktop">
    <WindowComponent 
      v-for="(window, widx) in windowStore.windows"
      :title="window.title"
      :id="window.id"
      :zi="upCount()"
      :key="`window-${window.id}`"
      :index="widx"
      :content="window.content"
    />
    <IconComponent
      v-for="(icon, iidx) in iconStore.icons"
      :title="`${icon.title}-${iidx}`"
      :id="icon.id"
      :zi="upCount(10)"
      :index="iidx"
      :key="`icon-${icon.id}`"
    />
  </div>
</template>

<script setup lang="ts">

import { useIconStore, useWindowStore } from '@/store'

import { upCount } from '@/utils/Utils';

import WindowComponent from '@/components/WindowComponent.vue';
import IconComponent from './IconComponent.vue';

const windowStore = useWindowStore()
const iconStore = useIconStore()

</script>

<style scoped>

</style>
