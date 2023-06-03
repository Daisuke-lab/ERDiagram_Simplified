import CanvasTextStyleType from "./CanvasTextStyleType";



export interface SimpleTextType {
    id: string,
    roomId: string,
    x: number,
    y: number,
    width: number,
    height: number,
    scale: {x:number, y:number},
    content: string,
    updatedBy: string,
    rotation: number,
    style: CanvasTextStyleType,
}

export default SimpleTextType