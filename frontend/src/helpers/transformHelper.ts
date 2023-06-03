import { AnchorLocationType } from "../../types"
import * as Konva from "konva"
import { NodeConfig, Node } from "konva/lib/Node"

export const getEdgeR = (anchorLocation:AnchorLocationType, width:number, height:number) => {
    const r = "bottom" === anchorLocation?Math.sqrt((width/2)**2 + (height)**2)
    :anchorLocation==="top"?(width/2)
    :anchorLocation==="left"?height/2
    :Math.sqrt((width)**2 + (height/2)**2)

    return r
}

export const getEdgeRotation = (anchorLocation:AnchorLocationType, width:number, r:number, originalRotation:number) => {
    const rotation = "top"===anchorLocation?originalRotation
    :"right"===anchorLocation?originalRotation + Math.acos(width / r) * (180 / Math.PI)
    :"bottom"===anchorLocation?originalRotation + Math.acos((width /2) / r) * (180 / Math.PI)
    :originalRotation + 90

    return rotation
}

export const getRect = (target:Konva.default.Shape | Konva.default.Group | null | Node<NodeConfig> | undefined) => {
    const rect = {x:0,y:0, width:0, height:0}
    if (target !== null && target !== undefined) {
        rect.x = target.x()
        rect.y = target.y()
        rect.width = target.getClientRect({skipTransform:true}).width * target.scaleX()
        rect.height = target.getClientRect({skipTransform:true}).height * target.scaleY()
    }
    return rect
}

export function getCenter(x: number, y:number, rotation:number, width:number, height:number) {
    const radians = (Math.PI / 180) * rotation// * (rotation - 90)
    const r = Math.sqrt((width/2)**2 + (height/2)**2)
    const cosTheta = Math.cos(radians)
    const sinTheta = Math.sin(radians)
    const a = (height/2)
    const b = r
    const c = (width/2)
    const cos = (c**2 + b**2 - a**2)/(2*b*c)
    const sin  =Math.sqrt(1 - cos**2)
    const newCos = (cosTheta * cos - sin*sinTheta)
    const newSin = Math.sqrt(1 - newCos**2)
    const symbol =  Math.abs(sinTheta) <= sin && 0 < rotation && rotation <= 90?1:
                    Math.abs(sinTheta) <= sin && rotation > 90?-1:
                    Math.abs(sinTheta) > sin && rotation > 0?1:
                    Math.abs(sinTheta) <= sin && -90 < rotation && rotation<= 0?1:-1
    const centerY =   symbol * r * newSin + y
    const centerX = x + r * newCos
    return {centerX, centerY}
}