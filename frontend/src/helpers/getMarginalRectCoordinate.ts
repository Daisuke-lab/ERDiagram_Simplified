import * as Konva from "konva"
import React from "react"
import AnchorLocationType from "../../types/AnchorLocationType"

import { ANCHOR_DISTANCE, BOTTOM, LEFT, RIGHT, TOP } from "../constant"


export default function getMarginalRectCoordinate(targetRef:React.RefObject<Konva.default.Shape>, location:AnchorLocationType) {
    const width = targetRef.current?.attrs.width * targetRef.current?.attrs.scaleX
    const height = targetRef.current?.attrs.height * targetRef.current?.attrs.scaleY
    const x = targetRef.current?.attrs.x
    const y = targetRef.current?.attrs.y

    switch(location) {
        case TOP:
            return  {x: x - ANCHOR_DISTANCE, y: y - ANCHOR_DISTANCE, width: width + ANCHOR_DISTANCE*2, height: ANCHOR_DISTANCE}
        case BOTTOM:
            return {x:x - ANCHOR_DISTANCE, y:y + height, width:width + ANCHOR_DISTANCE*2, height:ANCHOR_DISTANCE}
        case LEFT:
            return {x:x - ANCHOR_DISTANCE, y, width:ANCHOR_DISTANCE, height}
        case RIGHT:
            return {x:x + width, y, width:ANCHOR_DISTANCE, height}
        default:
            return {x:0,y:0,width:0, height:0}
    }

}

