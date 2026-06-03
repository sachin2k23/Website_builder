import { useEffect, useMemo, useRef, useState } from 'react'
import CanvasElement from './builder/CanvasElement'
import { getCanvasWidth } from '../utils/responsive'
import { getCanvasHeight } from '../utils/editorGeometry'

const noop = () => {}

export default function ThumbnailPreview({
  elements = [],
  canvasSettings,
  breakpoint = 'desktop',
  customWidth = 800,
  emptyLabel = 'Blank',
}) {
  const ref = useRef(null)
  const [width, setWidth] = useState(0)

  const safeCanvasSettings = canvasSettings || {
    width: 1200,
    height: 900,
    fill: '#ffffff',
  }

  const canvasWidth = getCanvasWidth(breakpoint, safeCanvasSettings, customWidth)
  const canvasHeight = getCanvasHeight(elements, safeCanvasSettings, breakpoint)
  const scale = width > 0 ? width / canvasWidth : 0

  const sortedElements = useMemo(
    () => elements
      .map((element, index) => ({ element, index }))
      .sort((a, b) => {
        const az = a.element.zIndex ?? 0
        const bz = b.element.zIndex ?? 0
        if (az !== bz) return az - bz
        return a.index - b.index
      })
      .map(item => item.element),
    [elements],
  )

  useEffect(() => {
    const measure = () => {
      if (ref.current) setWidth(ref.current.getBoundingClientRect().width)
    }

    measure()
    const observer = new ResizeObserver(measure)
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="thumbnail-preview relative aspect-[4/3] w-full overflow-hidden bg-[#F8FAFC]"
    >
      {elements.length === 0 ? (
        <div className="flex h-full w-full items-center justify-center text-xs font-semibold text-[#A1A1AA]">
          {emptyLabel}
        </div>
      ) : (
        <div
          aria-hidden="true"
          style={{
            width: canvasWidth,
            height: canvasHeight,
            transform: `scale(${scale || 0.25})`,
            transformOrigin: 'top left',
            background: safeCanvasSettings.fill || '#ffffff',
            position: 'relative',
            pointerEvents: 'none',
          }}
        >
          {sortedElements.map(element => (
            <CanvasElement
              key={element.id}
              element={element}
              isSelected={false}
              onSelect={noop}
              onDelete={noop}
              onUpdate={noop}
              onContextMenu={noop}
              zoom={1}
              activeBreakpoint={breakpoint}
              elements={elements}
              canvasWidth={canvasWidth}
              canvasHeight={canvasHeight}
              onInteractionGuides={noop}
            />
          ))}
        </div>
      )}
    </div>
  )
}
