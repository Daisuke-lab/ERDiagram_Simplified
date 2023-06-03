import AnchorLocationType from './AnchorLocationType'
import ConnectionOptionType from './ConnectionOptionType'


export interface ShapeConnectionType {
    id: string,
    anchorLocation: AnchorLocationType,
    connectionOption: ConnectionOptionType
}
export default ShapeConnectionType