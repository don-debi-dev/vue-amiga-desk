import { Option } from "@/types";
import mitt from "mitt";

export type Events = {
  optionClicked: Option;
  iconDropped: DropEvent
};

export type Vector2 = { 
  x: number; 
  y: number 
};

export interface DragEventType {
  id: string;
  position: Vector2;
}

export interface DropEvent {
  droppedId: string; 
  recievedId: string;
}

export interface DragEvents {
  dragstart: DragEventType;
  drag: DragEventType;
  dragend: DragEventType;
  // Mitt corner fix
  [key: string]: unknown;
  [key: symbol]: unknown;
}

export const dragBus = mitt<DragEvents>();
export const eventBus = mitt<Events>();
