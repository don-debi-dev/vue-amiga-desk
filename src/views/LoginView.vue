<template>
  <div class="screen">
    <MenuComponent type="screen" version="3.0" />
    <DesktopComponent />
  </div>
</template>

<script setup lang="ts">

import MenuComponent from '@/components/MenuComponent.vue'
import DesktopComponent from '@/components/DesktopComponent.vue'

import { useWindowStore } from '@/store';
import { Login } from '@/data';

const store = useWindowStore();
store.add({ payload: Login });

</script>

<style scoped>

</style>