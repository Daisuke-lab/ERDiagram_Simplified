import { CanvasTextStyleType } from "./CanvasTextStyleType"

export interface TextType {
    id: string,
    content: string,
    style: CanvasTextStyleType,
    updatedBy: string
}

export default TextType