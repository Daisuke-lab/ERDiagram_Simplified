export interface CanvasTextStyleType {
    fontFamily?: string
    fontSize? : number,
    fontWeight?: "unset" | "bold",
    fontStyle?: "unset" | "italic",
    textDecorationLine?: "unset" | "underline",
    textAlign?: "unset" | "left" | "center" | "right",
    color?: string,
    fill?: string
}

export default CanvasTextStyleType