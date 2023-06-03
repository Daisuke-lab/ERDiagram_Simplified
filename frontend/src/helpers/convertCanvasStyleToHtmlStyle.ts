import * as Konva from "konva"
import { ObjectType } from "../../types"
import CanvasTextStyleType from "../../types/CanvasTextStyleType"



export default function convertCanvasStyleToHtmlStyle(
    textRef:React.RefObject<Konva.default.Text>,
    containerRef:React.RefObject<Konva.default.Group | Konva.default.Text>) {
        var style:ObjectType = {}
        if (textRef.current !== null && containerRef.current !== null) {
            style = setLocation(style, textRef.current)
            style = setTransform(style, containerRef.current)
            style.fontSize = textRef.current.fontSize() + 'px';
            style.fontWeight = textRef.current.attrs?.fontStyle.includes("bold")?"bold":"unset"
            style.fontStyle = textRef.current.attrs?.fontStyle.includes("italic")?"italic":"unset"
            style.textDecorationLine = textRef.current.attrs?.textDecoration
            style.lineHeight = textRef.current.lineHeight();
            style.fontFamily = textRef.current.fontFamily();
            style.textAlign = textRef.current.align();
            style.color = textRef.current.fill();
        }
        return style
}



const setLocation = (style:ObjectType, konvaText:Konva.default.Text) => {
    style.position = 'absolute';
    const textPosition = konvaText.absolutePosition();
    style.top = textPosition.y + 'px';
    style.left = textPosition.x + 'px';
    style.width = konvaText.width() - konvaText.padding() * 2 + 'px';
    style.height = konvaText.height() - konvaText.padding() * 2 + 5 + 'px';
    return style
}

const setTransform = (style:ObjectType, container:Konva.default.Group | Konva.default.Text) => {
    const scale = container.scale();
    const rotation = container.rotation();
    var transform:string = '';
    transform += `scaleX(${scale.x})`
    transform += `scaleY(${scale.y})`
    if (rotation) {
        transform += 'rotateZ(' + rotation + 'deg)';
    }
    style.transform = transform;
    return style    
}


