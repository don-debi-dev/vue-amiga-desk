import { defineStore } from 'pinia'
import { uniqueNumber, upCount } from '@/utils/Utils';
import { Icon } from '@/types';
import { DropEvent } from '@/bus/eventBus';

export const useIconStore = defineStore('icons', {
  state: () => {
    return {
      icons: [] as Icon[],
      focused: ''
    }
  },
  actions: {
    add(action: { payload: Icon; }) {
      const newId = action.payload.id || uniqueNumber();
      if (!this.icons.find(({id}) => id == action.payload.id)) {
        this.icons = [...this.icons, {...action.payload, id: action.payload.id || newId, zi: upCount(10)}];
      }
    },
    getCopy(action: { payload: DropEvent; }) {
      const { droppedId } = action.payload;
      const test = this.icons.find(icon => icon.id === droppedId) as Icon;
      const { id, ...rest } = test;
      const copy = { ...rest, id: uniqueNumber() }
      return copy;
    },
    remove(action: { payload: { id: string }; }) {
      this.icons = [...this.icons.filter((i) => i.id !== action.payload.id)];
    },
    update(action: { payload: { id: string, zi: number, pos?: { x: number, y: number }}}) {
      const { id, zi } = action.payload;
      this.icons = this.icons.map(i => i.id === id ? { ...i, zi } : i);
    },
    focus(action: { payload: { id: string } }) {
      this.focused = action.payload.id;
    }
  },
})

export type iconStoreType = ReturnType<typeof useIconStore>;