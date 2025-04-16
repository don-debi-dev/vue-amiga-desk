import { Menu } from "@/types";
import { Upload } from "./windows";
import { UIComponents } from "@/types";
import { DonDebiDev } from "./icons";

export const Desk: Menu = {
  title: "Desk",
	sub: false,
  options: [
    {
      text: "Upload Image",
      uiComponent: UIComponents.windowComponent,
      payload: {
        ...Upload 
      }
    },
    {
      text: "Add icon",
      uiComponent: UIComponents.iconComponent,
      payload: {
        ...DonDebiDev
      }
    },
    {
      text: "New Window",
      uiComponent: UIComponents.windowComponent,
      payload: { 
        title: "New Window", 
        id: '', 
        zi: 0
      },
    }
  ]
};
