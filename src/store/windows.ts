import { defineStore } from 'pinia'
import { uniqueNumber, upCount } from '@/utils/Utils';
import { Icon, UIComponentType, Window } from '@/types';

export const useWindowStore = defineStore('windows', {
  state: () => {
    return {
      windows: [] as Window[],
      focused: ''
    }
  },
  actions: {
    add(action: { payload: Window; }) {
      const newId = action.payload.id || uniqueNumber();
      this.focused = newId;
      if (!this.windows.find(({id}) => id == action.payload.id)) {
        this.windows = [...this.windows, {...action.payload, id: action.payload.id || newId, zi: upCount()}];
      }
    },
    get(action: { payload: { id: string }; }) {
      return this.windows.find(window => window.id === action.payload.id);
    },
    addContent(action: { payload: { id: string, component: { component: UIComponentType, cprops: Icon } }; }) {
      this.windows = this.windows.map(w => w.id === action.payload.id ? 
      // Maybe remove the optional content and go for emprty array
      { ...w, content: [ ...(w.content || []), action.payload.component ] } : w);
    },
    remove(action: { payload: Window; }) {
      this.windows = [...this.windows.filter((w) => w.id !== action.payload.id)];
      this.focused = (this.windows && this.windows.length) ? this.windows.reduce((max : Window, win : Window) => (win.zi > max.zi ? win : max)).id : '';
    },
    update(action: { payload: { id: string, zi: number, pos?: { x: number, y: number }}}) {
      const { id, zi } = action.payload;
      this.windows = this.windows.map(w => w.id === id ? { ...w, zi } : w);
    },
    focus(action: { payload: { id: string } }) {
      this.focused = action.payload.id;
    }
  },
})

export type WindowStoreType = ReturnType<typeof useWindowStore>;