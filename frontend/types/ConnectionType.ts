import ShapeConnectionType from "./ShapeConnectionType"
import PointConnectionType from "./PointConnectionType"

export interface ConnectionType {
    source: ShapeConnectionType,
    destination: PointConnectionType | ShapeConnectionType,
    id: string,
    updatedBy: string
}

export default ConnectionType