import { ref, onMounted, onBeforeUnmount } from 'vue';
import { dragBus, Vector2 } from '@/bus/eventBus';

export function useDropTarget() {
  const output = ref<{ isHovered: boolean; id?: string }>({ isHovered: false });
  const dropped = ref<{ id: string } | null>(null);
  const target = ref<HTMLElement | null>(null);

  const checkHover = (position: Vector2, id?: string) => {
    const el = target.value;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    
    const isHovered = dropCheck(position, rect);

    output.value = { isHovered, id };
  };

  const onDrag = ({ position, id }: { position: Vector2; id: string }) => {
    checkHover(position, id);
  };

  const dropCheck = (position: Vector2, rect: DOMRect) => {
    return position.x >= rect.left && position.x <= rect.right && position.y >= rect.top && position.y <= rect.bottom;
  }

  const onDrop = ({ position, id }: { position: Vector2; id: string }) => {
    const el = target.value;
    if (!el) return;

    const rect = el.getBoundingClientRect();

    const isHovered = dropCheck(position, rect);

    if (isHovered) {
      dropped.value = { id };
    }

    output.value = { isHovered: false };
  };

  onMounted(() => {
    dragBus.on('drag', onDrag);
    dragBus.on('dragend', onDrop);
  });

  onBeforeUnmount(() => {
    dragBus.off('drag', onDrag);
    dragBus.off('dragend', onDrop);
  });

  return {
    output,
    dropped,
    target
  };
}
