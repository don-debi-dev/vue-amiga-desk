import { ref, onMounted, onBeforeUnmount, Ref } from 'vue';
import { dragBus, DragEventType } from '@/bus/eventBus';

export function useDraggable(target: Ref<HTMLElement | null>, options: DragEventType) {
  
  const { position: initialPosition = { x: 100, y: 100 }, id } = options;

  const position = ref({ ...initialPosition });
  const offset = ref({ x: 0, y: 0 });
  const dragging = ref(false);

  const startDrag = (event: MouseEvent) => {
    offset.value = {
      x: event.clientX - position.value.x,
      y: event.clientY - position.value.y
    };

    dragging.value = true;
    
    addListeners();

    dragBus.emit('dragstart', { id, position: position.value });
  };

  const stopDrag = () => {
    dragging.value = false;

    removeListeners();

    dragBus.emit('dragend', { id, position: position.value });
  };

  const handleMove = (event: MouseEvent) => {
    if (!dragging.value) return;

    position.value = {
      x: event.clientX - offset.value.x,
      y: event.clientY - offset.value.y
    };

    dragBus.emit('drag', { id, position: position.value });
  };

  const addListeners = () => {
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', stopDrag);
  };

  const removeListeners = () => {
    window.removeEventListener('mousemove', handleMove);
    window.removeEventListener('mouseup', stopDrag);
  };

  // Is this needed if listeners are added removed on events ??
  onMounted(() => {
    target.value?.addEventListener('mousedown', startDrag);
  });
  
  // Is this needed if listeners are added removed on events ??
  onBeforeUnmount(() => {
    target.value?.removeEventListener('mousedown', startDrag);
    removeListeners();
  });

  return {
    position,
    dragging,
    on: dragBus.on,
    off: dragBus.off
  };
}
