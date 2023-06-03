import * as Konva from "konva"
import CanvasTextStyleType from "../../types/CanvasTextStyleType"

import { ObjectType } from "../../types/ObjectType"


export default function extractCanvasStyleFromRef(textRef:React.RefObject<Konva.default.Text>) {

    if (textRef.current !== null) {
        const canvasStyle = {
            fontFamily: textRef.current.fontFamily(),
            fontSize: parseInt(textRef.current.fontSize().toString()),
            fontWeight: textRef.current.attrs?.fontStyle.includes("bold")?"bold":"unset",
            fontStyle: textRef.current.attrs?.fontStyle.includes("italic")?"italic":"unset",
            textDecorationLine: textRef.current.attrs?.textDecoration,
            color: textRef.current.fill(),
            textAlign: textRef.current.align()
        } as CanvasTextStyleType
        return canvasStyle
    }
    return {}
}