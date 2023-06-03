import TextType from './TextType'

export interface RowType {
    key: TextType,
    value: TextType,
    id: string,
    updatedBy: string,
    index: number
}

export default RowType