import { MethodType } from "./MethodType"
import ShapeNameType from "./ShapeNameType"
import ShapeType from "./ShapeType"

export interface ChangeType {
    method: MethodType
    shapeName: ShapeNameType,
    from: ShapeType | null,
    to: ShapeType | null
}

export default ChangeType