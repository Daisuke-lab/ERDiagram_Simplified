import * as Konva from "konva"
import React from "react"
import AnchorLocationType from "../../types/AnchorLocationType"
import ShapeType from "../../types/ShapeNameType"
import { BOTTOM, LEFT, RIGHT, ER_DIAGRAM, TOP, ANCHOR_DISTANCE } from "../constant"
import { getCenter,getRect } from "./transformHelper"
import LocationType from "../../types/LocationType"



export default function getAnchorPoint(targetRef:React.RefObject<Konva.default.Shape | Konva.default.Group>,
                                        location:AnchorLocationType) {

    const {x,y, width, height} = getRect(targetRef.current)
    const widthWithMargin = width + ANCHOR_DISTANCE*2
    const heightWithMargin = height + ANCHOR_DISTANCE*2

    const {centerX, centerY} = getCenter(x, y, targetRef.current?.rotation() ?? 0, width, height)
    const rotation = getAnchorRotation(targetRef.current?.rotation() ?? 0, location)
    const r = getAnchorR(location, widthWithMargin, heightWithMargin)
    const radians = (Math.PI / 180) * (rotation)
    const cosTheta = Math.cos(radians)
    const sinTheta = Math.sin(radians)


    return {x:centerX + r*sinTheta, y:centerY - r*cosTheta}

}




export function getAnchorRotation(originalRotation:number, location:AnchorLocationType) {
    switch(location) {
        case TOP:
            return originalRotation
        case RIGHT:
            return originalRotation + 90
        case BOTTOM:
            return originalRotation - 180
        case LEFT:
            return originalRotation - 90
        default:
            return 0
    }
    
}

export function getAnchorR(location:AnchorLocationType, width:number, height:number) {
    switch(location) {
        case TOP:
        case BOTTOM:
            return height/2
        case RIGHT:
        case LEFT:
            return width/2
        default:
            return 0
    }
}

export function getRotationofXY(originalRotation:number, width:number, height:number) {
    const a = (height/2)
    const b = Math.sqrt((width/2)**2 + (height/2)**2)
    const c = (width/2)
    const cos = (c**2 + b**2 - a**2)/(2*b*c)
    return -90 + (Math.acos(cos) / (Math.PI / 180)) + originalRotation
}