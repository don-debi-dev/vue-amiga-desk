import { defineStore } from 'pinia'
// import { uniqueNumber, upCount } from '@/utils/Utils';
import { Menu } from '@/types';

export const useMenuStore = defineStore('menu', {
  state: () => {
    return {
      menus: [] as Menu[],
    }
  },
  actions: {
    // Questionable if these functions needs to be.
    // add(action: { payload: Menu; }) {
    //   const newId = action.payload.id || uniqueNumber();
    //   if (!this.menus.find(({id}) => id == action.payload.id)) {
    //     this.menus = [...this.menus, {...action.payload, id: action.payload.id || newId }];
    //   }
    // },
    // remove(action: { payload: Menu; }) {
    //   this.menus = [...this.menus.filter((w) => w.id !== action.payload.id)];
    // }
  }
})
