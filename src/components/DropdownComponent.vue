<template>
  <div
    class="dropdown"
    :style="{ zIndex: zi }"
    @mouseenter="showDropDown"
    @mouseleave="hideDropdown"
  >
    <!-- OptionComponent used as a trigger -->
    <OptionComponent :text="props.triggerText" :invert="isShown" />
    <div v-if="isShown" class="menu-sub" @click="hideDropdown">
      <slot>
        <!-- Slot for options to fill dropdown-->
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { upCount } from '@/utils/Utils';
import OptionComponent from '@/components/OptionComponent.vue';

const props = defineProps<{
  triggerText: string;
}>();

const isShown = ref(false);

const zi = ref(upCount());

const showDropDown = () => {
  zi.value = upCount();
  isShown.value = true;
};

const hideDropdown = () => {
  isShown.value = false;
};

</script>

<style scoped>

</style>
