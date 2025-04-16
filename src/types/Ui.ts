import UploadComponent from "@/components/UploadComponent.vue";
import WindowComponent from "@/components/WindowComponent.vue";
import IconComponent from "@/components/IconComponent.vue";

import { markRaw } from "vue";

// markRaw to stop reactive connections
export const UIComponents = {
  uploadComponent: markRaw(UploadComponent),
  windowComponent: markRaw(WindowComponent),
  iconComponent: markRaw(IconComponent),
} as const;

export type UIComponentType = (typeof UIComponents)[keyof typeof UIComponents];

export interface UIComponent {
  id: string;
  title: string;
  zi: number;
}

export interface Icon extends UIComponent {
  image?: string;
  payload?: object;
}

export interface ComponentWithProps {
  component: UIComponentType;
  cprops?: UIComponent;
}

export interface Window extends UIComponent {
  content?: ComponentWithProps[];
}

