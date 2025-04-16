import { UIComponentType } from "@/types"
import { UIComponent } from "@/types"

export interface Menu {
  title: string,
  sub: boolean // future implementation?
  options: Option[]
}

export interface Option {
  text: string,
  uiComponent: UIComponentType,
  payload?: UIComponent,
  action?: () => void
}
