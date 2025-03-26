import React, {useEffect, useState, useRef} from 'react';
import { Stage, Layer, Rect, Group, Text, Transformer, Line } from 'react-konva';
import { useAppSelector, useAppDispatch } from '../helpers/hooks'
import {ErDiagramType, RowType} from "../../types"
import ErDiagramText from './ErDiagramText'

import { AppDispatch, RootState } from '../../store/store';
import * as Konva from "konva"
import CurrentRowDecoration from './CurrentRowDecoration';
import { openMenu, setEnabledItems} from '../../store/reducers/commonReducer';
import { setCurrentErDiagram, setCurrentRow } from '../../store/reducers/erDiagramReducer';
import { DEFAULT_ER_DIAGRAM_ROW_HEIGHT, DEFAULT_ER_DIAGRAM_TITLE_HEIGHT, DEFAULT_ER_DIAGRAM_WIDTH, ER_DIAGRAM_ROW, ER_DIAGRAM_ROW_KEY, ER_DIAGRAM_ROW_VALUE } from '../constant';
interface Props {
    index: number,
    erDiagram: ErDiagramType,
    dispatch: AppDispatch,
    state: RootState,
    row: RowType,
    erDiagramRef: React.RefObject<Konva.default.Group>

}

function Row(props:Props) {
    const {index, erDiagram, dispatch, state, row,erDiagramRef} = props
    const currentErDiagram = state.erDiagrams.currentErDiagram
    const currentRow = state.erDiagrams.currentRow
    const fieldWidth = DEFAULT_ER_DIAGRAM_WIDTH / 2
    const onRowRightClick = (event: any) => {
      if (row === currentRow) {
        const target = event.currentTarget
        dispatch(openMenu({x: target.parent.attrs.x, y:target.parent.attrs.y}))
        dispatch(setEnabledItems(["delete-row","add-row", "delete-erDiagram"]))
      }
    }

    const onClick = () => {
        if (erDiagram === currentErDiagram && row !== currentRow) {
          dispatch(setCurrentRow(row))
          dispatch(setCurrentErDiagram(erDiagram))
        } else if (erDiagram !== currentErDiagram) {
          dispatch(setCurrentErDiagram(erDiagram))
        }
    }
  return (
    <Group onContextMenu={onRowRightClick} onClick={onClick} id={row.id} name={ER_DIAGRAM_ROW}>
          <Line
          x={0}
          y={DEFAULT_ER_DIAGRAM_ROW_HEIGHT*(index+1) + DEFAULT_ER_DIAGRAM_TITLE_HEIGHT}
          stroke="black"
          strokeWidth={1}
          tension={1}
          points={[0,0, DEFAULT_ER_DIAGRAM_WIDTH,0]}
          />

          <Line
          x={0}
          y={DEFAULT_ER_DIAGRAM_ROW_HEIGHT*index + DEFAULT_ER_DIAGRAM_TITLE_HEIGHT}
          stroke="black"
          strokeWidth={1}
          tension={1}
          points={[0,0, 0,DEFAULT_ER_DIAGRAM_ROW_HEIGHT]}
          />
          <ErDiagramText
          isSelected={currentRow === row}
          text={row.key}
          field={ER_DIAGRAM_ROW_KEY}
          dispatch={dispatch}
          state={state}
          erDiagramRef={erDiagramRef}
          x={0}
          y={DEFAULT_ER_DIAGRAM_ROW_HEIGHT*index + DEFAULT_ER_DIAGRAM_TITLE_HEIGHT}
          erDiagram={erDiagram}
          />
            <Line
          x={fieldWidth}
          y={DEFAULT_ER_DIAGRAM_ROW_HEIGHT*index + DEFAULT_ER_DIAGRAM_TITLE_HEIGHT}
          stroke="black"
          strokeWidth={1}
          tension={1}
          points={[0,0, 0,DEFAULT_ER_DIAGRAM_ROW_HEIGHT]}
          />
            <Line
          x={DEFAULT_ER_DIAGRAM_WIDTH}
          y={DEFAULT_ER_DIAGRAM_ROW_HEIGHT*index + DEFAULT_ER_DIAGRAM_TITLE_HEIGHT}
          stroke="black"
          strokeWidth={1}
          tension={1}
          points={[0,0, 0, DEFAULT_ER_DIAGRAM_ROW_HEIGHT]}
          />
          <ErDiagramText
            isSelected={currentRow === row}
            text={row.value}
            field={ER_DIAGRAM_ROW_VALUE}
            dispatch={dispatch}
            state={state}
            x={fieldWidth}
            y={DEFAULT_ER_DIAGRAM_ROW_HEIGHT*index + DEFAULT_ER_DIAGRAM_TITLE_HEIGHT}
            erDiagramRef={erDiagramRef}
            erDiagram={erDiagram}
            />
            {currentRow === row?
          <CurrentRowDecoration
          x={0}
          y={DEFAULT_ER_DIAGRAM_ROW_HEIGHT*(index) + DEFAULT_ER_DIAGRAM_TITLE_HEIGHT}
          />
          :<></>}
        </Group>
  )
}

export default Row