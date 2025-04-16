<template>
  <div :class="`menu-${type}`">
    <template v-for="(menu) in props.menus" :key="`menu-${menu.title}`">
      <DropdownComponent :triggerText="menu.title">
        <OptionComponent
          v-for="(option, index) in menu.options"
          :text="option.text"
          :option="option"
          :key="`menu-${menu.title}-${index}`"
          @option-clicked="onOptionClick"
        />
      </DropdownComponent>
    </template>
    <span v-if="type === 'screen'" class="app-version">
      <span>{{ props.version }}</span>
    </span>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';

import DropdownComponent from '@/components/DropdownComponent.vue';
import OptionComponent from '@/components/OptionComponent.vue';
import { Menu, Option } from '@/types';

const props = defineProps<{
  type?: string;
  version?: string;
  menus?: Array<Menu>;
}>();

const type = computed(() => props.type ?? 'window');

const onOptionClick = (option: Option) => {
  console.log('Option clicked:', option);
};

</script>

<style scoped>

</style>
