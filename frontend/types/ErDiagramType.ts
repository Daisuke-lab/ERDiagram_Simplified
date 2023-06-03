import RowType from "./RowType"
import TextType from './TextType'

export interface ErDiagramType {
    rows: RowType[],
    id: string,
    title: TextType,
    x: number,
    y: number,
    rotation: number,
    scale: {x: number, y:number},
    updatedBy: string
}
export default ErDiagramType
