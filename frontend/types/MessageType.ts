export interface MessageType<T = any> {
    dataType: string,
    method: string,
    oldData: T,
    newData: T,
    isUndo: boolean,
    isRedo: boolean
}

export default MessageType