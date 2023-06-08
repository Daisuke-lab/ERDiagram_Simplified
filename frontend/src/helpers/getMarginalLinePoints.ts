import * as Konva from "konva"
import React from "react"
import AnchorLocationType from "../../types/AnchorLocationType"

import { ANCHOR_DISTANCE, BOTTOM, LEFT, RIGHT, TOP } from "../constant"


export default function getMarginalLinePoints(targetRef:React.RefObject<Konva.default.Shape>, location:AnchorLocationType) {
    const width = targetRef.current?.attrs.width * targetRef.current?.attrs.scaleX
    const height = targetRef.current?.attrs.height * targetRef.current?.attrs.scaleY
    const x = targetRef.current?.attrs.x
    const y = targetRef.current?.attrs.y

    switch(location) {
        case TOP:
            return  [x - ANCHOR_DISTANCE, y - ANCHOR_DISTANCE, x + width + ANCHOR_DISTANCE, y - ANCHOR_DISTANCE]
        case BOTTOM:
            return [x - ANCHOR_DISTANCE, y + height + ANCHOR_DISTANCE, x + width + ANCHOR_DISTANCE, y + height + ANCHOR_DISTANCE]
        case LEFT:
            return [x - ANCHOR_DISTANCE, y - ANCHOR_DISTANCE, x - ANCHOR_DISTANCE, y + ANCHOR_DISTANCE]
        case RIGHT:
            return [x + width + ANCHOR_DISTANCE, y - ANCHOR_DISTANCE, x + width + ANCHOR_DISTANCE, y + ANCHOR_DISTANCE]
        default:
            return [0,0]
    }

}
