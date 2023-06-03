import * as alt from "./AnchorLocationType"
import * as clt from './ConnectionOptionType'
import * as rt from "./RoomType"
import * as ctst from './CanvasTextStyleType'
import * as tt from './TextType'
import * as rowt from "./RowType"
import * as sct from "./ShapeConnectionType"
import * as pct from "./PointConnectionType"
import * as ct from "./ConnectionType"
import * as mt from "./MessageType"
import * as pt from "./PermissionType"
import * as lt from "./LocationType"
import * as snt from "./ShapeNameType"
import * as sst from "./ShareStatusType"
import * as ot from "./ObjectType"
import * as tab_t from "./TabType"
import * as ut from "./UserType"
import * as stt from "./SimpleTextType"
import * as etft from "./ErDiagramTextFieldType"

export type RoomType = rt.RoomType;
export type ConnectionOptionType = clt.ConnectionOptionType
export type TextStyleType = ctst.CanvasTextStyleType
export type TextType = tt.TextType
export type RowType = rowt.RowType
export type AnchorLocationType = alt.AnchorLocationType
export type ShapeConnectionType = sct.ShapeConnectionType
export type PointConnectionType = pct.PointConnectionType
export type ConnectionType = ct.ConnectionType
export type ErDiagramType = import("./ErDiagramType").ErDiagramType
export type MessageType<T> = mt.MessageType<T>
export type CustomSessionType = import("./CustomSessionType").CustomSessionType
export type PermissionType = pt.PermissionType
export type LocationType = lt.LocationType
export type ShapeType = snt.ShapeNameType
export type ShareStatusType = sst.ShareStatusType
export type ObjectType = ot.ObjectType
export type TabType = tab_t.TabType
export type UserType = ut.UserType
export type SimpleTextType = stt.SimpleTextType
export type ErDiagramTextFieldType = etft.ErDiagramTextFieldType