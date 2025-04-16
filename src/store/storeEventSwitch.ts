import { Option } from '@/types';
import { UIComponents } from '@/types';
import { useIconStore, useWindowStore } from '@/store';

// store instance cache
let windowStore: ReturnType<typeof useWindowStore> | null = null;
let iconStore: ReturnType<typeof useIconStore> | null = null;

export const onOptionClick = (option: Option) => {

  const { uiComponent, payload } = option || {};

  if (!uiComponent) {
    console.warn(`Option: ${JSON.stringify(option)} is missing UIComponent:`, option);
    return;
  }
  
  if (payload == null) {
    console.warn(`Option: ${JSON.stringify(option)} is missing Payload:`, option);
    return;
  } 

  switch (uiComponent) {
    case UIComponents.windowComponent:
      if (!windowStore) windowStore = useWindowStore();
      windowStore.add({ payload });
      break;
    case UIComponents.iconComponent:
      if (!iconStore) iconStore = useIconStore();
      iconStore.add({ payload });
      break;
    default:
      console.log('Unable to interpret component blueprint.');
      break;
  }
};
