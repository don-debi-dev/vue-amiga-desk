
import { ComponentWithProps, UIComponents, Window } from "@/types";

export const UploadContent: ComponentWithProps = {
  component: UIComponents.uploadComponent,
  cprops: {
    title: "upload", 
    id: 'upload', 
    zi: 0,
  }
}

export const Login: Window = {
    title: "Login", 
    id: 'login', 
    zi: 0,
    content: []
  }
  
  export const Upload: Window = {
    title: "Upload Image", 
    id: '123', 
    zi: 0,
    content: [UploadContent]
  }