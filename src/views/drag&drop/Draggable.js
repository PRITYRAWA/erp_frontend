import React from 'react'
import { useDrag } from 'react-dnd'
import { ItemTypes } from '../../Constants'

/**
 * Your Component
 */
export default function Draggable({ isDragging, id, value }) {
  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: ItemTypes.FIELD,
      item: { id, value },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1
      })
    }),
    []
  )
  return (
    <div ref={dragRef} style={{ opacity }}>
      <input type='text' value={value} style={{ width: '50%' }} />
    </div>

  )
}